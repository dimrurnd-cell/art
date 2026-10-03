#!/usr/bin/env python3
"""Сборка аватаров онлайн-режима из Microsoft Rocketbox (лицензия MIT).

Результат — папка static/artcatalog/avatars/:
  f0.glb … f7.glb, m0.glb … m7.glb  — модели (номер = outfit в live_server.py);
  anims.glb                          — общие клипы «стоит» и «идёт»;
  CREDITS.txt                        — авторство.
Портреты для окна входа (f0.webp …) делает avatar-shots.cjs по готовым GLB.

Подготовка (один раз, нужен интернет; на сервер это не ставится):

  git clone --filter=blob:none --no-checkout \\
      https://github.com/microsoft/Microsoft-Rocketbox rocketbox
  git -C rocketbox config gc.auto 0
  npm i --prefix avtools fbx2gltf @gltf-transform/core \\
      @gltf-transform/extensions @gltf-transform/functions meshoptimizer
  pip install pillow

Запуск:

  python3 build-avatars.py rocketbox avtools ../../static/artcatalog/avatars

Файлы из Rocketbox вынимаются по одному через «git show» — весь репозиторий
(десятки гигабайт) не скачивается. Не запускайте в клоне «git ls-tree -l» и
«git checkout»: они тянут все файлы подряд.
"""
import io
import os
import shutil
import subprocess
import sys

from PIL import Image

# (outfit, модель Rocketbox, код текстур, подпись)
LOOKS = {
    'f': [
        ('Professions/Business_Female_01', 'f014', 'Деловой костюм'),
        ('Adults/Female_Adult_11', 'f011', 'Платье'),
        ('Professions/Business_Female_03', 'f016', 'Костюм с юбкой'),
        ('Adults/Female_Adult_01', 'f001', 'Повседневный'),
        ('Adults/Female_Adult_15', 'f018', 'Блузка и юбка'),
        ('Adults/Female_Party_02', 'f022', 'Нарядный топ'),
        ('Adults/Female_Adult_02', 'f002', 'Свитер и юбка'),
        ('Adults/Female_Party_01', 'f010', 'Летний'),
    ],
    'm': [
        ('Professions/Business_Male_01', 'm005', 'Чёрный костюм'),
        ('Professions/Business_Male_02', 'm008', 'Тёмно-синий костюм'),
        ('Adults/Male_Adult_08', 'm014', 'Рубашка'),
        ('Adults/Male_Adult_06', 'm011', 'Повседневный'),
        ('Professions/Business_Male_05', 'm016', 'Клетчатый костюм'),
        ('Professions/Business_Male_06', 'm025', 'Белая рубашка'),
        ('Adults/Male_Adult_02', 'm003', 'Свитер'),
        ('Adults/Male_Adult_13', 'm010', 'Джемпер'),
    ],
}
ANIMS = {
    'walk': 'all_animations_max_motextr_xy/{s}_walk_neutral_01.max.fbx',
    'idle': 'all_animations_max_motextr_static/{s}_idle_breathe_01.max.fbx',
}
HERE = os.path.dirname(os.path.abspath(__file__))


def git_file(repo, path, dest):
    """Один файл из частичного клона (догружается по требованию)."""
    data = subprocess.run(['git', '-C', repo, 'show', 'HEAD:' + path],
                          check=True, stdout=subprocess.PIPE).stdout
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, 'wb') as f:
        f.write(data)
    return data


def has_file(repo, path):
    return subprocess.run(['git', '-C', repo, 'cat-file', '-e', 'HEAD:' + path],
                          stderr=subprocess.DEVNULL).returncode == 0


def webp(data, dest, size, quality, alpha=False):
    im = Image.open(io.BytesIO(data))
    im = im.convert('RGBA' if alpha else 'RGB').resize((size, size), Image.LANCZOS)
    im.save(dest, 'WEBP', quality=quality, method=6, **({'alpha_quality': 90} if alpha else {}))


def fbx2glb(tools, fbx, out_base):
    osname = {'linux': 'Linux', 'darwin': 'Darwin', 'win32': 'Windows_NT'}[sys.platform]
    exe = os.path.join(tools, 'node_modules', 'fbx2gltf', 'bin', osname,
                       'FBX2glTF.exe' if osname == 'Windows_NT' else 'FBX2glTF')
    subprocess.run([exe, '--binary', '--input', fbx, '--output', out_base],
                   check=True, stdout=subprocess.DEVNULL)
    return out_base + '.glb'


def node(tools, script, *args):
    # скрипт кладём рядом с node_modules, иначе Node не найдёт пакеты
    shutil.copy(os.path.join(HERE, script), os.path.join(tools, script))
    subprocess.run(['node', os.path.join(tools, script)] + list(args), check=True)


def main(repo, tools, out):
    repo, tools, out = (os.path.abspath(p) for p in (repo, tools, out))
    work = os.path.join(tools, 'work')
    os.makedirs(work, exist_ok=True)
    os.makedirs(out, exist_ok=True)
    for sex, looks in LOOKS.items():
        for n, (model, code, label) in enumerate(looks):
            name = model.split('/')[1]
            base = 'Assets/Avatars/' + model
            tmp = os.path.join(work, name)
            fbx = os.path.join(tmp, 'Export', name + '.fbx')
            git_file(repo, base + '/Export/' + name + '.fbx', fbx)
            # FBX2glTF ищет текстуры рядом; нам они не нужны — ставим свои
            raw = fbx2glb(tools, fbx, os.path.join(tmp, 'raw'))
            tex = {}
            for part, size, q in (('body', 1024, 82), ('head', 1024, 85)):
                data = git_file(repo, '%s/Textures/%s_%s_color.tga' % (base, code, part),
                                os.path.join(tmp, part + '.tga'))
                tex[part] = os.path.join(tmp, part + '.webp')
                webp(data, tex[part], size, q)
            hair_src = '%s/Textures/%s_opacity_color.tga' % (base, code)
            tex['hair'] = '-'
            if has_file(repo, hair_src):
                data = git_file(repo, hair_src, os.path.join(tmp, 'hair.tga'))
                tex['hair'] = os.path.join(tmp, 'hair.webp')
                webp(data, tex['hair'], 512, 80, alpha=True)
            dest = os.path.join(out, '%s%d.glb' % (sex, n))
            node(tools, 'avatar-pack.mjs', raw, tex['body'], tex['head'], tex['hair'], dest)
            print('%s%d  %-32s %-20s %4d КБ' % (sex, n, name, label, os.path.getsize(dest) // 1024))

    clips = []
    for sex in 'fm':
        for kind, path in ANIMS.items():
            fbx = os.path.join(work, 'anims', '%s_%s.fbx' % (sex, kind))
            git_file(repo, 'Assets/Animations/' + path.format(s=sex), fbx)
            clips.append('%s_%s=%s' % (sex, kind, fbx2glb(tools, fbx, fbx[:-4])))
    dest = os.path.join(out, 'anims.glb')
    node(tools, 'anims-pack.mjs', dest, *clips)
    print('anims.glb %d КБ' % (os.path.getsize(dest) // 1024))

    with open(os.path.join(out, 'CREDITS.txt'), 'w', encoding='utf-8') as f:
        f.write(CREDITS)


CREDITS = """Аватары онлайн-режима и их анимации — Microsoft Rocketbox Avatar Library
https://github.com/microsoft/Microsoft-Rocketbox

MIT License

Copyright (c) 2020 Microsoft

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Модели пересобраны для браузера: упрощены материалы, уменьшены текстуры,
сжата геометрия (gallery/tools/build-avatars.py).
"""

if __name__ == '__main__':
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(*sys.argv[1:])
