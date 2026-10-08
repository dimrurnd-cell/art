/* Арт-Ростов — WebGL-галерея. Сборка: catalog/gallery (npm run build). three.js © three.js authors, MIT */
(()=>{var Xp=0,id=1,jp=2;var Rf=1,Ih=2,ai=3,qn=0,Jt=1,Ht=2,kt=0,Os=1,is=2,sd=3,rd=4,Lh=5,vn=100,Yp=101,Kp=102,Zp=103,Jp=104,rr=200,Qp=201,$p=202,em=203,fc=204,pc=205,Go=206,tm=207,Wo=208,nm=209,im=210,sm=211,rm=212,am=213,om=214,mc=0,gc=1,xc=2,Vs=3,bc=4,vc=5,_c=6,yc=7,Dh=0,lm=1,cm=2,Li=0,Uh=1,Nh=2,kh=3,Fh=4,hm=5,Oh=6,ia=7,ad="attached",um="detached",qo=300,Gs=301,Ws=302,Mc=303,Sc=304,Xo=306,Qt=1e3,_n=1001,Br=1002,Rt=1003,Bh=1004;var Ds=1005;var Vt=1006,Lr=1007;var yn=1008;var Fn=1009,Cf=1010,Pf=1011,zr=1012,zh=1013,ss=1014,kn=1015,Pt=1016,Hh=1017,Vh=1018,Di=1020,If=35902,Lf=1021,Df=1022,Zt=1023,Uf=1024,Nf=1025,Bs=1026,Ui=1027,Gh=1028,Wh=1029,kf=1030,qh=1031;var Xh=1033,Qa=33776,$a=33777,eo=33778,to=33779,wc=35840,Ec=35841,Tc=35842,Ac=35843,Rc=36196,Cc=37492,Pc=37496,Ic=37808,Lc=37809,Dc=37810,Uc=37811,Nc=37812,kc=37813,Fc=37814,Oc=37815,Bc=37816,zc=37817,Hc=37818,Vc=37819,Gc=37820,Wc=37821,no=36492,qc=36494,Xc=36495,Ff=36283,jc=36284,Yc=36285,Kc=36286,dm=2200,fm=2201,pm=2202,qs=2300,Xs=2301,Il=2302,Us=2400,Ns=2401,io=2402,jh=2500,mm=2501,Of=0,jo=1,sa=2,gm=3200,xm=3201;var Yo=0,bm=1,Wn="",je="srgb",tn="srgb-linear",Ko="linear",ot="srgb";var ps=7680;var od=519,vm=512,_m=513,ym=514,Bf=515,Mm=516,Sm=517,wm=518,Em=519,Zc=35044;var ld="300 es",li=2e3,so=2001,hi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cd=1234567,Dr=Math.PI/180,js=180/Math.PI;function Mn(){let r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Yt[r&255]+Yt[r>>8&255]+Yt[r>>16&255]+Yt[r>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[t&63|128]+Yt[t>>8&255]+"-"+Yt[t>>16&255]+Yt[t>>24&255]+Yt[n&255]+Yt[n>>8&255]+Yt[n>>16&255]+Yt[n>>24&255]).toLowerCase()}function Ut(r,e,t){return Math.max(e,Math.min(t,r))}function Yh(r,e){return(r%e+e)%e}function Tm(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Am(r,e,t){return r!==e?(t-r)/(e-r):0}function Ur(r,e,t){return(1-t)*r+t*e}function Rm(r,e,t,n){return Ur(r,e,1-Math.exp(-t*n))}function Cm(r,e=1){return e-Math.abs(Yh(r,e*2)-e)}function Pm(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Im(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Lm(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Dm(r,e){return r+Math.random()*(e-r)}function Um(r){return r*(.5-Math.random())}function Nm(r){r!==void 0&&(cd=r);let e=cd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function km(r){return r*Dr}function Fm(r){return r*js}function Om(r){return(r&r-1)===0&&r!==0}function Bm(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function zm(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Hm(r,e,t,n,i){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*m,l*f,o*c);break;case"YXY":r.set(l*f,o*h,l*m,o*c);break;case"ZYZ":r.set(l*m,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Nn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ct(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var zf={DEG2RAD:Dr,RAD2DEG:js,generateUUID:Mn,clamp:Ut,euclideanModulo:Yh,mapLinear:Tm,inverseLerp:Am,lerp:Ur,damp:Rm,pingpong:Cm,smoothstep:Pm,smootherstep:Im,randInt:Lm,randFloat:Dm,randFloatSpread:Um,seededRandom:Nm,degToRad:km,radToDeg:Fm,isPowerOfTwo:Om,ceilPowerOfTwo:Bm,floorPowerOfTwo:zm,setQuaternionFromProperEuler:Hm,normalize:ct,denormalize:Nn},G=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qe=class r{constructor(e,t,n,i,s,a,o,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],b=i[0],g=i[3],p=i[6],_=i[1],v=i[4],x=i[7],E=i[2],w=i[5],T=i[8];return s[0]=a*b+o*_+l*E,s[3]=a*g+o*v+l*w,s[6]=a*p+o*x+l*T,s[1]=c*b+h*_+u*E,s[4]=c*g+h*v+u*w,s[7]=c*p+h*x+u*T,s[2]=d*b+f*_+m*E,s[5]=d*g+f*v+m*w,s[8]=d*p+f*x+m*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/m;return e[0]=u*b,e[1]=(i*c-h*n)*b,e[2]=(o*n-i*a)*b,e[3]=d*b,e[4]=(h*t-i*l)*b,e[5]=(i*s-o*t)*b,e[6]=f*b,e[7]=(n*l-c*t)*b,e[8]=(a*t-n*s)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ll.makeScale(e,t)),this}rotate(e){return this.premultiply(Ll.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ll.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ll=new qe;function Hf(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Hr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Vm(){let r=Hr("canvas");return r.style.display="block",r}var hd={};function Pr(r){r in hd||(hd[r]=!0,console.warn(r))}function Gm(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Wm(r){let e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function qm(r){let e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var Ke={enabled:!0,workingColorSpace:tn,spaces:{},convert:function(r,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===ot&&(r.r=ci(r.r),r.g=ci(r.g),r.b=ci(r.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(r.applyMatrix3(this.spaces[e].toXYZ),r.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===ot&&(r.r=zs(r.r),r.g=zs(r.g),r.b=zs(r.b))),r},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Wn?Ko:this.spaces[r].transfer},getLuminanceCoefficients:function(r,e=this.workingColorSpace){return r.fromArray(this.spaces[e].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,e,t){return r.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function ci(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function zs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var ud=[.64,.33,.3,.6,.15,.06],dd=[.2126,.7152,.0722],fd=[.3127,.329],pd=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),md=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ke.define({[tn]:{primaries:ud,whitePoint:fd,transfer:Ko,toXYZ:pd,fromXYZ:md,luminanceCoefficients:dd,workingColorSpaceConfig:{unpackColorSpace:je},outputColorSpaceConfig:{drawingBufferColorSpace:je}},[je]:{primaries:ud,whitePoint:fd,transfer:ot,toXYZ:pd,fromXYZ:md,luminanceCoefficients:dd,outputColorSpaceConfig:{drawingBufferColorSpace:je}}});var ms,Jc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ms===void 0&&(ms=Hr("canvas")),ms.width=e.width,ms.height=e.height;let n=ms.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ms}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=Hr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=ci(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ci(t[n]/255)*255):t[n]=ci(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Xm=0,ro=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xm++}),this.uuid=Mn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Dl(i[a].image)):s.push(Dl(i[a]))}else s=Dl(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Dl(r){return typeof HTMLImageElement!="undefined"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&r instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&r instanceof ImageBitmap?Jc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var jm=0,St=class r extends hi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=_n,i=_n,s=Vt,a=yn,o=Zt,l=Fn,c=r.DEFAULT_ANISOTROPY,h=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=Mn(),this.name="",this.source=new ro(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new G(0,0),this.repeat=new G(1,1),this.center=new G(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==qo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qt:e.x=e.x-Math.floor(e.x);break;case _n:e.x=e.x<0?0:1;break;case Br:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qt:e.y=e.y-Math.floor(e.y);break;case _n:e.y=e.y<0?0:1;break;case Br:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=qo;St.DEFAULT_ANISOTROPY=1;var tt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],b=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-b)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+b)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(c+1)/2,x=(f+1)/2,E=(p+1)/2,w=(h+d)/4,T=(u+b)/4,I=(m+g)/4;return v>x&&v>E?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=w/n,s=T/n):x>E?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=w/i,s=I/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=T/s,i=I/s),this.set(n,i,s,t),this}let _=Math.sqrt((g-m)*(g-m)+(u-b)*(u-b)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(g-m)/_,this.y=(u-b)/_,this.z=(d-h)/_,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Qc=class extends hi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);let i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new St(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new ro(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ct=class extends Qc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ao=class extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var $c=class extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ft=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],f=s[a+1],m=s[a+2],b=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=b;return}if(u!==b||l!==d||c!==f||h!==m){let g=1-o,p=l*d+c*f+h*m+u*b,_=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let E=Math.sqrt(v),w=Math.atan2(E,p*_);g=Math.sin(g*w)/E,o=Math.sin(o*w)/E}let x=o*_;if(l=l*g+d*x,c=c*g+f*x,h=h*g+m*x,u=u*g+b*x,g===1-o){let E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+h*u+l*f-c*d,e[t+1]=l*m+h*d+c*u-o*f,e[t+2]=c*m+h*f+o*d-l*u,e[t+3]=h*m-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),f=l(i/2),m=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ul.copy(this).projectOnVector(e),this.sub(Ul)}reflect(e){return this.sub(Ul.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ul=new P,gd=new Ft,hn=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ln):Ln.fromBufferAttribute(s,a),Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),va.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),va.copy(n.boundingBox)),va.applyMatrix4(e.matrixWorld),this.union(va)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vr),_a.subVectors(this.max,vr),gs.subVectors(e.a,vr),xs.subVectors(e.b,vr),bs.subVectors(e.c,vr),wi.subVectors(xs,gs),Ei.subVectors(bs,xs),Ki.subVectors(gs,bs);let t=[0,-wi.z,wi.y,0,-Ei.z,Ei.y,0,-Ki.z,Ki.y,wi.z,0,-wi.x,Ei.z,0,-Ei.x,Ki.z,0,-Ki.x,-wi.y,wi.x,0,-Ei.y,Ei.x,0,-Ki.y,Ki.x,0];return!Nl(t,gs,xs,bs,_a)||(t=[1,0,0,0,1,0,0,0,1],!Nl(t,gs,xs,bs,_a))?!1:(ya.crossVectors(wi,Ei),t=[ya.x,ya.y,ya.z],Nl(t,gs,xs,bs,_a))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},ei=[new P,new P,new P,new P,new P,new P,new P,new P],Ln=new P,va=new hn,gs=new P,xs=new P,bs=new P,wi=new P,Ei=new P,Ki=new P,vr=new P,_a=new P,ya=new P,Zi=new P;function Nl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Zi.fromArray(r,s);let o=i.x*Math.abs(Zi.x)+i.y*Math.abs(Zi.y)+i.z*Math.abs(Zi.z),l=e.dot(Zi),c=t.dot(Zi),h=n.dot(Zi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ym=new hn,_r=new P,kl=new P,on=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Ym.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_r.subVectors(e,this.center);let t=_r.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(_r,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(kl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_r.copy(e.center).add(kl)),this.expandByPoint(_r.copy(e.center).sub(kl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},ti=new P,Fl=new P,Ma=new P,Ti=new P,Ol=new P,Sa=new P,Bl=new P,rs=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ti.copy(this.origin).addScaledVector(this.direction,t),ti.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Fl.copy(e).add(t).multiplyScalar(.5),Ma.copy(t).sub(e).normalize(),Ti.copy(this.origin).sub(Fl);let s=e.distanceTo(t)*.5,a=-this.direction.dot(Ma),o=Ti.dot(this.direction),l=-Ti.dot(Ma),c=Ti.lengthSq(),h=Math.abs(1-a*a),u,d,f,m;if(h>0)if(u=a*l-o,d=a*o-l,m=s*h,u>=0)if(d>=-m)if(d<=m){let b=1/h;u*=b,d*=b,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Fl).addScaledVector(Ma,d),f}intersectSphere(e,t){ti.subVectors(e.center,this.origin);let n=ti.dot(this.direction),i=ti.dot(ti)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ti)!==null}intersectTriangle(e,t,n,i,s){Ol.subVectors(t,e),Sa.subVectors(n,e),Bl.crossVectors(Ol,Sa);let a=this.direction.dot(Bl),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ti.subVectors(this.origin,e);let l=o*this.direction.dot(Sa.crossVectors(Ti,Sa));if(l<0)return null;let c=o*this.direction.dot(Ol.cross(Ti));if(c<0||l+c>a)return null;let h=-o*Ti.dot(Bl);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Te=class r{constructor(e,t,n,i,s,a,o,l,c,h,u,d,f,m,b,g){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,d,f,m,b,g)}set(e,t,n,i,s,a,o,l,c,h,u,d,f,m,b,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=b,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/vs.setFromMatrixColumn(e,0).length(),s=1/vs.setFromMatrixColumn(e,1).length(),a=1/vs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,f=a*u,m=o*h,b=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+m*c,t[5]=d-b*c,t[9]=-o*l,t[2]=b-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,m=c*h,b=c*u;t[0]=d+b*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=b+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,m=c*h,b=c*u;t[0]=d-b*o,t[4]=-a*u,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=b-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,f=a*u,m=o*h,b=o*u;t[0]=l*h,t[4]=m*c-f,t[8]=d*c+b,t[1]=l*u,t[5]=b*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,m=o*l,b=o*c;t[0]=l*h,t[4]=b-d*u,t[8]=m*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+m,t[10]=d-b*u}else if(e.order==="XZY"){let d=a*l,f=a*c,m=o*l,b=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+b,t[5]=a*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=o*h,t[10]=b*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Km,e,Zm)}lookAt(e,t,n){let i=this.elements;return fn.subVectors(e,t),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),Ai.crossVectors(n,fn),Ai.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),Ai.crossVectors(n,fn)),Ai.normalize(),wa.crossVectors(fn,Ai),i[0]=Ai.x,i[4]=wa.x,i[8]=fn.x,i[1]=Ai.y,i[5]=wa.y,i[9]=fn.y,i[2]=Ai.z,i[6]=wa.z,i[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],b=n[6],g=n[10],p=n[14],_=n[3],v=n[7],x=n[11],E=n[15],w=i[0],T=i[4],I=i[8],S=i[12],y=i[1],R=i[5],F=i[9],k=i[13],O=i[2],K=i[6],V=i[10],$=i[14],W=i[3],ee=i[7],oe=i[11],pe=i[15];return s[0]=a*w+o*y+l*O+c*W,s[4]=a*T+o*R+l*K+c*ee,s[8]=a*I+o*F+l*V+c*oe,s[12]=a*S+o*k+l*$+c*pe,s[1]=h*w+u*y+d*O+f*W,s[5]=h*T+u*R+d*K+f*ee,s[9]=h*I+u*F+d*V+f*oe,s[13]=h*S+u*k+d*$+f*pe,s[2]=m*w+b*y+g*O+p*W,s[6]=m*T+b*R+g*K+p*ee,s[10]=m*I+b*F+g*V+p*oe,s[14]=m*S+b*k+g*$+p*pe,s[3]=_*w+v*y+x*O+E*W,s[7]=_*T+v*R+x*K+E*ee,s[11]=_*I+v*F+x*V+E*oe,s[15]=_*S+v*k+x*$+E*pe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],b=e[7],g=e[11],p=e[15];return m*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*f-n*l*f)+b*(+t*l*f-t*c*d+s*a*d-i*a*f+i*c*h-s*l*h)+g*(+t*c*u-t*o*f-s*a*u+n*a*f+s*o*h-n*c*h)+p*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],b=e[13],g=e[14],p=e[15],_=u*g*c-b*d*c+b*l*f-o*g*f-u*l*p+o*d*p,v=m*d*c-h*g*c-m*l*f+a*g*f+h*l*p-a*d*p,x=h*b*c-m*u*c+m*o*f-a*b*f-h*o*p+a*u*p,E=m*u*l-h*b*l-m*o*d+a*b*d+h*o*g-a*u*g,w=t*_+n*v+i*x+s*E;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/w;return e[0]=_*T,e[1]=(b*d*s-u*g*s-b*i*f+n*g*f+u*i*p-n*d*p)*T,e[2]=(o*g*s-b*l*s+b*i*c-n*g*c-o*i*p+n*l*p)*T,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*f-n*l*f)*T,e[4]=v*T,e[5]=(h*g*s-m*d*s+m*i*f-t*g*f-h*i*p+t*d*p)*T,e[6]=(m*l*s-a*g*s-m*i*c+t*g*c+a*i*p-t*l*p)*T,e[7]=(a*d*s-h*l*s+h*i*c-t*d*c-a*i*f+t*l*f)*T,e[8]=x*T,e[9]=(m*u*s-h*b*s-m*n*f+t*b*f+h*n*p-t*u*p)*T,e[10]=(a*b*s-m*o*s+m*n*c-t*b*c-a*n*p+t*o*p)*T,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*f-t*o*f)*T,e[12]=E*T,e[13]=(h*b*i-m*u*i+m*n*d-t*b*d-h*n*g+t*u*g)*T,e[14]=(m*o*i-a*b*i-m*n*l+t*b*l+a*n*g-t*o*g)*T,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*T,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,m=s*u,b=a*h,g=a*u,p=o*u,_=l*c,v=l*h,x=l*u,E=n.x,w=n.y,T=n.z;return i[0]=(1-(b+p))*E,i[1]=(f+x)*E,i[2]=(m-v)*E,i[3]=0,i[4]=(f-x)*w,i[5]=(1-(d+p))*w,i[6]=(g+_)*w,i[7]=0,i[8]=(m+v)*T,i[9]=(g-_)*T,i[10]=(1-(d+b))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=vs.set(i[0],i[1],i[2]).length(),a=vs.set(i[4],i[5],i[6]).length(),o=vs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Dn.copy(this);let c=1/s,h=1/a,u=1/o;return Dn.elements[0]*=c,Dn.elements[1]*=c,Dn.elements[2]*=c,Dn.elements[4]*=h,Dn.elements[5]*=h,Dn.elements[6]*=h,Dn.elements[8]*=u,Dn.elements[9]*=u,Dn.elements[10]*=u,t.setFromRotationMatrix(Dn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=li){let l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),f,m;if(o===li)f=-(a+s)/(a-s),m=-2*a*s/(a-s);else if(o===so)f=-a/(a-s),m=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=li){let l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(a-s),d=(t+e)*c,f=(n+i)*h,m,b;if(o===li)m=(a+s)*u,b=-2*u;else if(o===so)m=s*u,b=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=b,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},vs=new P,Dn=new Te,Km=new P(0,0,0),Zm=new P(1,1,1),Ai=new P,wa=new P,fn=new P,xd=new Te,bd=new Ft,Wt=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return xd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bd.setFromEuler(this),this.setFromQuaternion(bd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Wt.DEFAULT_ORDER="XYZ";var Vr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Jm=0,vd=new P,_s=new Ft,ni=new Te,Ea=new P,yr=new P,Qm=new P,$m=new Ft,_d=new P(1,0,0),yd=new P(0,1,0),Md=new P(0,0,1),Sd={type:"added"},eg={type:"removed"},ys={type:"childadded",child:null},zl={type:"childremoved",child:null},gt=class r extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jm++}),this.uuid=Mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new P,t=new Wt,n=new Ft,i=new P(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Te},normalMatrix:{value:new qe}}),this.matrix=new Te,this.matrixWorld=new Te,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.multiply(_s),this}rotateOnWorldAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.premultiply(_s),this}rotateX(e){return this.rotateOnAxis(_d,e)}rotateY(e){return this.rotateOnAxis(yd,e)}rotateZ(e){return this.rotateOnAxis(Md,e)}translateOnAxis(e,t){return vd.copy(e).applyQuaternion(this.quaternion),this.position.add(vd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_d,e)}translateY(e){return this.translateOnAxis(yd,e)}translateZ(e){return this.translateOnAxis(Md,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ea.copy(e):Ea.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt(yr,Ea,this.up):ni.lookAt(Ea,yr,this.up),this.quaternion.setFromRotationMatrix(ni),i&&(ni.extractRotation(i.matrixWorld),_s.setFromRotationMatrix(ni),this.quaternion.premultiply(_s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sd),ys.child=e,this.dispatchEvent(ys),ys.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(eg),zl.child=e,this.dispatchEvent(zl),zl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sd),ys.child=e,this.dispatchEvent(ys),ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,e,Qm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,$m,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};gt.DEFAULT_UP=new P(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Un=new P,ii=new P,Hl=new P,si=new P,Ms=new P,Ss=new P,wd=new P,Vl=new P,Gl=new P,Wl=new P,ql=new tt,Xl=new tt,jl=new tt,Pi=class r{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Un.subVectors(e,t),i.cross(Un);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Un.subVectors(i,t),ii.subVectors(n,t),Hl.subVectors(e,t);let a=Un.dot(Un),o=Un.dot(ii),l=Un.dot(Hl),c=ii.dot(ii),h=ii.dot(Hl),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,m=(a*h-o*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,si.x),l.addScaledVector(a,si.y),l.addScaledVector(o,si.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return ql.setScalar(0),Xl.setScalar(0),jl.setScalar(0),ql.fromBufferAttribute(e,t),Xl.fromBufferAttribute(e,n),jl.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(ql,s.x),a.addScaledVector(Xl,s.y),a.addScaledVector(jl,s.z),a}static isFrontFacing(e,t,n,i){return Un.subVectors(n,t),ii.subVectors(e,t),Un.cross(ii).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Un.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),Un.cross(ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;Ms.subVectors(i,n),Ss.subVectors(s,n),Vl.subVectors(e,n);let l=Ms.dot(Vl),c=Ss.dot(Vl);if(l<=0&&c<=0)return t.copy(n);Gl.subVectors(e,i);let h=Ms.dot(Gl),u=Ss.dot(Gl);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Ms,a);Wl.subVectors(e,s);let f=Ms.dot(Wl),m=Ss.dot(Wl);if(m>=0&&f<=m)return t.copy(s);let b=f*c-l*m;if(b<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Ss,o);let g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return wd.subVectors(s,i),o=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(wd,o);let p=1/(g+b+d);return a=b*p,o=d*p,t.copy(n).addScaledVector(Ms,a).addScaledVector(Ss,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Vf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},Ta={h:0,s:0,l:0};function Yl(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}var fe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=je){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ke.workingColorSpace){if(e=Yh(e,1),t=Ut(t,0,1),n=Ut(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Yl(a,s,e+1/3),this.g=Yl(a,s,e),this.b=Yl(a,s,e-1/3)}return Ke.toWorkingColorSpace(this,i),this}setStyle(e,t=je){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=je){let n=Vf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ci(e.r),this.g=ci(e.g),this.b=ci(e.b),this}copyLinearToSRGB(e){return this.r=zs(e.r),this.g=zs(e.g),this.b=zs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=je){return Ke.fromWorkingColorSpace(Kt.copy(this),e),Math.round(Ut(Kt.r*255,0,255))*65536+Math.round(Ut(Kt.g*255,0,255))*256+Math.round(Ut(Kt.b*255,0,255))}getHexString(e=je){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Kt.copy(this),t);let n=Kt.r,i=Kt.g,s=Kt.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Kt.copy(this),t),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=je){Ke.fromWorkingColorSpace(Kt.copy(this),e);let t=Kt.r,n=Kt.g,i=Kt.b;return e!==je?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ri),this.setHSL(Ri.h+e,Ri.s+t,Ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ri),e.getHSL(Ta);let n=Ur(Ri.h,Ta.h,t),i=Ur(Ri.s,Ta.s,t),s=Ur(Ri.l,Ta.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Kt=new fe;fe.NAMES=Vf;var tg=0,$t=class extends hi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tg++}),this.uuid=Mn(),this.name="",this.blending=Os,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fc,this.blendDst=pc,this.blendEquation=vn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=Vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=od,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ps,this.stencilZFail=ps,this.stencilZPass=ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Os&&(n.blending=this.blending),this.side!==qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fc&&(n.blendSrc=this.blendSrc),this.blendDst!==pc&&(n.blendDst=this.blendDst),this.blendEquation!==vn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==od&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ps&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ps&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ps&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},et=class extends $t{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=Dh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var It=new P,Aa=new G,ut=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Zc,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Aa.fromBufferAttribute(this,t),Aa.applyMatrix3(e),this.setXY(t,Aa.x,Aa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array),s=ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zc&&(e.usage=this.usage),e}};var oo=class extends ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var lo=class extends ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ye=class extends ut{constructor(e,t,n){super(new Float32Array(e),t,n)}},ng=0,bn=new Te,Kl=new gt,ws=new P,pn=new hn,Mr=new hn,zt=new P,pt=class r extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ng++}),this.uuid=Mn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hf(e)?lo:oo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new qe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,n){return bn.makeTranslation(e,t,n),this.applyMatrix4(bn),this}scale(e,t,n){return bn.makeScale(e,t,n),this.applyMatrix4(bn),this}lookAt(e){return Kl.lookAt(e),Kl.updateMatrix(),this.applyMatrix4(Kl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ws).negate(),this.translate(ws.x,ws.y,ws.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ye(n,3))}else{for(let n=0,i=t.count;n<i;n++){let s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];pn.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new on);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(pn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Mr.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(pn.min,Mr.min),pn.expandByPoint(zt),zt.addVectors(pn.max,Mr.max),pn.expandByPoint(zt)):(pn.expandByPoint(Mr.min),pn.expandByPoint(Mr.max))}pn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)zt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(zt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)zt.fromBufferAttribute(o,c),l&&(ws.fromBufferAttribute(e,c),zt.add(ws)),i=Math.max(i,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ut(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new P,l[I]=new P;let c=new P,h=new P,u=new P,d=new G,f=new G,m=new G,b=new P,g=new P;function p(I,S,y){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,y),d.fromBufferAttribute(s,I),f.fromBufferAttribute(s,S),m.fromBufferAttribute(s,y),h.sub(c),u.sub(c),f.sub(d),m.sub(d);let R=1/(f.x*m.y-m.x*f.y);isFinite(R)&&(b.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(R),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(R),o[I].add(b),o[S].add(b),o[y].add(b),l[I].add(g),l[S].add(g),l[y].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let I=0,S=_.length;I<S;++I){let y=_[I],R=y.start,F=y.count;for(let k=R,O=R+F;k<O;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let v=new P,x=new P,E=new P,w=new P;function T(I){E.fromBufferAttribute(i,I),w.copy(E);let S=o[I];v.copy(S),v.sub(E.multiplyScalar(E.dot(S))).normalize(),x.crossVectors(w,S);let R=x.dot(l[I])<0?-1:1;a.setXYZW(I,v.x,v.y,v.z,R)}for(let I=0,S=_.length;I<S;++I){let y=_[I],R=y.start,F=y.count;for(let k=R,O=R+F;k<O;k+=3)T(e.getX(k+0)),T(e.getX(k+1)),T(e.getX(k+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new P,s=new P,a=new P,o=new P,l=new P,c=new P,h=new P,u=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),b=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,b),a.fromBufferAttribute(t,g),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,b),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(b,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,m=0;for(let b=0,g=l.length;b<g;b++){o.isInterleavedBufferAttribute?f=l[b]*o.data.stride+o.offset:f=l[b]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new ut(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ed=new Te,Ji=new rs,Ra=new on,Td=new P,Ca=new P,Pa=new P,Ia=new P,Zl=new P,La=new P,Ad=new P,Da=new P,Ne=class extends gt{constructor(e=new pt,t=new et){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){La.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],u=s[l];h!==0&&(Zl.fromBufferAttribute(u,e),a?La.addScaledVector(Zl,h):La.addScaledVector(Zl.sub(t),h))}t.add(La)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ra.copy(n.boundingSphere),Ra.applyMatrix4(s),Ji.copy(e.ray).recast(e.near),!(Ra.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(Ra,Td)===null||Ji.origin.distanceToSquared(Td)>(e.far-e.near)**2))&&(Ed.copy(s).invert(),Ji.copy(e.ray).applyMatrix4(Ed),!(n.boundingBox!==null&&Ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ji)))}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,b=d.length;m<b;m++){let g=d[m],p=a[g.materialIndex],_=Math.max(g.start,f.start),v=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=_,E=v;x<E;x+=3){let w=o.getX(x),T=o.getX(x+1),I=o.getX(x+2);i=Ua(this,p,e,n,c,h,u,w,T,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),b=Math.min(o.count,f.start+f.count);for(let g=m,p=b;g<p;g+=3){let _=o.getX(g),v=o.getX(g+1),x=o.getX(g+2);i=Ua(this,a,e,n,c,h,u,_,v,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,b=d.length;m<b;m++){let g=d[m],p=a[g.materialIndex],_=Math.max(g.start,f.start),v=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=_,E=v;x<E;x+=3){let w=x,T=x+1,I=x+2;i=Ua(this,p,e,n,c,h,u,w,T,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),b=Math.min(l.count,f.start+f.count);for(let g=m,p=b;g<p;g+=3){let _=g,v=g+1,x=g+2;i=Ua(this,a,e,n,c,h,u,_,v,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function ig(r,e,t,n,i,s,a,o){let l;if(e.side===Jt?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===qn,o),l===null)return null;Da.copy(o),Da.applyMatrix4(r.matrixWorld);let c=t.ray.origin.distanceTo(Da);return c<t.near||c>t.far?null:{distance:c,point:Da.clone(),object:r}}function Ua(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,Ca),r.getVertexPosition(l,Pa),r.getVertexPosition(c,Ia);let h=ig(r,e,t,n,Ca,Pa,Ia,Ad);if(h){let u=new P;Pi.getBarycoord(Ad,Ca,Pa,Ia,u),i&&(h.uv=Pi.getInterpolatedAttribute(i,o,l,c,u,new G)),s&&(h.uv1=Pi.getInterpolatedAttribute(s,o,l,c,u,new G)),a&&(h.normal=Pi.getInterpolatedAttribute(a,o,l,c,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new P,materialIndex:0};Pi.getNormal(Ca,Pa,Ia,d.normal),h.face=d,h.barycoord=u}return h}var dt=class r extends pt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ye(c,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(u,2));function m(b,g,p,_,v,x,E,w,T,I,S){let y=x/T,R=E/I,F=x/2,k=E/2,O=w/2,K=T+1,V=I+1,$=0,W=0,ee=new P;for(let oe=0;oe<V;oe++){let pe=oe*R-k;for(let De=0;De<K;De++){let Xe=De*y-F;ee[b]=Xe*_,ee[g]=pe*v,ee[p]=O,c.push(ee.x,ee.y,ee.z),ee[b]=0,ee[g]=0,ee[p]=w>0?1:-1,h.push(ee.x,ee.y,ee.z),u.push(De/T),u.push(1-oe/I),$+=1}}for(let oe=0;oe<I;oe++)for(let pe=0;pe<T;pe++){let De=d+pe+K*oe,Xe=d+pe+K*(oe+1),X=d+(pe+1)+K*(oe+1),te=d+(pe+1)+K*oe;l.push(De,Xe,te),l.push(Xe,X,te),W+=6}o.addGroup(f,W,S),f+=W,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ys(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function an(r){let e={};for(let t=0;t<r.length;t++){let n=Ys(r[t]);for(let i in n)e[i]=n[i]}return e}function sg(r){let e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Gf(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}var un={clone:Ys,merge:an},rg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ag=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,st=class extends $t{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rg,this.fragmentShader=ag,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ys(e.uniforms),this.uniformsGroups=sg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},co=class extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Te,this.projectionMatrix=new Te,this.projectionMatrixInverse=new Te,this.coordinateSystem=li}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ci=new P,Rd=new G,Cd=new G,Nt=class extends co{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=js*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Dr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return js*2*Math.atan(Math.tan(Dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,Rd,Cd),t.subVectors(Cd,Rd)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Dr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Es=-90,Ts=1,Gr=class extends gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Nt(Es,Ts,e,t);i.layers=this.layers,this.add(i);let s=new Nt(Es,Ts,e,t);s.layers=this.layers,this.add(s);let a=new Nt(Es,Ts,e,t);a.layers=this.layers,this.add(a);let o=new Nt(Es,Ts,e,t);o.layers=this.layers,this.add(o);let l=new Nt(Es,Ts,e,t);l.layers=this.layers,this.add(l);let c=new Nt(Es,Ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===li)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===so)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ho=class extends St{constructor(e,t,n,i,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Gs,super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Wr=class extends Ct{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new ho(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Vt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new dt(5,5,5),s=new st({name:"CubemapFromEquirect",uniforms:Ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Jt,blending:kt});s.uniforms.tEquirect.value=t;let a=new Ne(i,s),o=t.minFilter;return t.minFilter===yn&&(t.minFilter=Vt),new Gr(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Jl=new P,og=new P,lg=new qe,oi=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Jl.subVectors(n,t).cross(og.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Jl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||lg.getNormalMatrix(e),i=this.coplanarPoint(Jl).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Qi=new on,Na=new P,ui=class{constructor(e=new oi,t=new oi,n=new oi,i=new oi,s=new oi,a=new oi){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=li){let n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],m=i[9],b=i[10],g=i[11],p=i[12],_=i[13],v=i[14],x=i[15];if(n[0].setComponents(l-s,d-c,g-f,x-p).normalize(),n[1].setComponents(l+s,d+c,g+f,x+p).normalize(),n[2].setComponents(l+a,d+h,g+m,x+_).normalize(),n[3].setComponents(l-a,d-h,g-m,x-_).normalize(),n[4].setComponents(l-o,d-u,g-b,x-v).normalize(),t===li)n[5].setComponents(l+o,d+u,g+b,x+v).normalize();else if(t===so)n[5].setComponents(o,u,b,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qi)}intersectsSprite(e){return Qi.center.set(0,0,0),Qi.radius=.7071067811865476,Qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Na.x=i.normal.x>0?e.max.x:e.min.x,Na.y=i.normal.y>0?e.max.y:e.min.y,Na.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Na)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Wf(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function cg(r){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(r.bindBuffer(c,o),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],b=u[f];b.start<=m.start+m.count+1?m.count=Math.max(m.count,b.start+b.count-m.start):(++d,u[d]=b)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let b=u[f];r.bufferSubData(c,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var wt=class r extends pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],m=[],b=[],g=[];for(let p=0;p<h;p++){let _=p*d-a;for(let v=0;v<c;v++){let x=v*u-s;m.push(x,-_,0),b.push(0,0,1),g.push(v/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<o;_++){let v=_+c*p,x=_+c*(p+1),E=_+1+c*(p+1),w=_+1+c*p;f.push(v,x,w),f.push(x,E,w)}this.setIndex(f),this.setAttribute("position",new Ye(m,3)),this.setAttribute("normal",new Ye(b,3)),this.setAttribute("uv",new Ye(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},hg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ug=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,dg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,vg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_g=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Mg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Sg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,wg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ag=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ig=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Lg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Dg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ug=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ng=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,kg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Og=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Gg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Qg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$g=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,e0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,t0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,n0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,i0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,s0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,r0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,a0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,o0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,l0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,c0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,h0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,u0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,d0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,f0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,p0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,m0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,g0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,x0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,b0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,v0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,M0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,S0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,w0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,E0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,T0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,A0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,R0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,C0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,P0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,I0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,L0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,D0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,U0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,N0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,k0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,F0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,O0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,B0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,z0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,H0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,V0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,G0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,W0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,q0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,X0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,j0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Y0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,K0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Z0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,J0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Q0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ex=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ix=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,sx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ax=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,lx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,cx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,px=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,xx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_x=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,wx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ex=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ax=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Rx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Px=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ix=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ux=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ox=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Hx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:hg,alphahash_pars_fragment:ug,alphamap_fragment:dg,alphamap_pars_fragment:fg,alphatest_fragment:pg,alphatest_pars_fragment:mg,aomap_fragment:gg,aomap_pars_fragment:xg,batching_pars_vertex:bg,batching_vertex:vg,begin_vertex:_g,beginnormal_vertex:yg,bsdfs:Mg,iridescence_fragment:Sg,bumpmap_pars_fragment:wg,clipping_planes_fragment:Eg,clipping_planes_pars_fragment:Tg,clipping_planes_pars_vertex:Ag,clipping_planes_vertex:Rg,color_fragment:Cg,color_pars_fragment:Pg,color_pars_vertex:Ig,color_vertex:Lg,common:Dg,cube_uv_reflection_fragment:Ug,defaultnormal_vertex:Ng,displacementmap_pars_vertex:kg,displacementmap_vertex:Fg,emissivemap_fragment:Og,emissivemap_pars_fragment:Bg,colorspace_fragment:zg,colorspace_pars_fragment:Hg,envmap_fragment:Vg,envmap_common_pars_fragment:Gg,envmap_pars_fragment:Wg,envmap_pars_vertex:qg,envmap_physical_pars_fragment:n0,envmap_vertex:Xg,fog_vertex:jg,fog_pars_vertex:Yg,fog_fragment:Kg,fog_pars_fragment:Zg,gradientmap_pars_fragment:Jg,lightmap_pars_fragment:Qg,lights_lambert_fragment:$g,lights_lambert_pars_fragment:e0,lights_pars_begin:t0,lights_toon_fragment:i0,lights_toon_pars_fragment:s0,lights_phong_fragment:r0,lights_phong_pars_fragment:a0,lights_physical_fragment:o0,lights_physical_pars_fragment:l0,lights_fragment_begin:c0,lights_fragment_maps:h0,lights_fragment_end:u0,logdepthbuf_fragment:d0,logdepthbuf_pars_fragment:f0,logdepthbuf_pars_vertex:p0,logdepthbuf_vertex:m0,map_fragment:g0,map_pars_fragment:x0,map_particle_fragment:b0,map_particle_pars_fragment:v0,metalnessmap_fragment:_0,metalnessmap_pars_fragment:y0,morphinstance_vertex:M0,morphcolor_vertex:S0,morphnormal_vertex:w0,morphtarget_pars_vertex:E0,morphtarget_vertex:T0,normal_fragment_begin:A0,normal_fragment_maps:R0,normal_pars_fragment:C0,normal_pars_vertex:P0,normal_vertex:I0,normalmap_pars_fragment:L0,clearcoat_normal_fragment_begin:D0,clearcoat_normal_fragment_maps:U0,clearcoat_pars_fragment:N0,iridescence_pars_fragment:k0,opaque_fragment:F0,packing:O0,premultiplied_alpha_fragment:B0,project_vertex:z0,dithering_fragment:H0,dithering_pars_fragment:V0,roughnessmap_fragment:G0,roughnessmap_pars_fragment:W0,shadowmap_pars_fragment:q0,shadowmap_pars_vertex:X0,shadowmap_vertex:j0,shadowmask_pars_fragment:Y0,skinbase_vertex:K0,skinning_pars_vertex:Z0,skinning_vertex:J0,skinnormal_vertex:Q0,specularmap_fragment:$0,specularmap_pars_fragment:ex,tonemapping_fragment:tx,tonemapping_pars_fragment:nx,transmission_fragment:ix,transmission_pars_fragment:sx,uv_pars_fragment:rx,uv_pars_vertex:ax,uv_vertex:ox,worldpos_vertex:lx,background_vert:cx,background_frag:hx,backgroundCube_vert:ux,backgroundCube_frag:dx,cube_vert:fx,cube_frag:px,depth_vert:mx,depth_frag:gx,distanceRGBA_vert:xx,distanceRGBA_frag:bx,equirect_vert:vx,equirect_frag:_x,linedashed_vert:yx,linedashed_frag:Mx,meshbasic_vert:Sx,meshbasic_frag:wx,meshlambert_vert:Ex,meshlambert_frag:Tx,meshmatcap_vert:Ax,meshmatcap_frag:Rx,meshnormal_vert:Cx,meshnormal_frag:Px,meshphong_vert:Ix,meshphong_frag:Lx,meshphysical_vert:Dx,meshphysical_frag:Ux,meshtoon_vert:Nx,meshtoon_frag:kx,points_vert:Fx,points_frag:Ox,shadow_vert:Bx,shadow_frag:zx,sprite_vert:Hx,sprite_frag:Vx},ce={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new G(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new G(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},Gn={basic:{uniforms:an([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:an([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new fe(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:an([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:an([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:an([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new fe(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:an([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:an([ce.points,ce.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:an([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:an([ce.common,ce.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:an([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:an([ce.sprite,ce.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:an([ce.common,ce.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:an([ce.lights,ce.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};Gn.physical={uniforms:an([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new G(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new G},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new G},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};var ka={r:0,b:0,g:0},$i=new Wt,Gx=new Te;function Wx(r,e,t,n,i,s,a){let o=new fe(0),l=s===!0?0:1,c,h,u=null,d=0,f=null;function m(_){let v=_.isScene===!0?_.background:null;return v&&v.isTexture&&(v=(_.backgroundBlurriness>0?t:e).get(v)),v}function b(_){let v=!1,x=m(_);x===null?p(o,l):x&&x.isColor&&(p(x,1),v=!0);let E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(_,v){let x=m(v);x&&(x.isCubeTexture||x.mapping===Xo)?(h===void 0&&(h=new Ne(new dt(1,1,1),new st({name:"BackgroundCubeMaterial",uniforms:Ys(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:Jt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),$i.copy(v.backgroundRotation),$i.x*=-1,$i.y*=-1,$i.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&($i.y*=-1,$i.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Gx.makeRotationFromEuler($i)),h.material.toneMapped=Ke.getTransfer(x.colorSpace)!==ot,(u!==x||d!==x.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Ne(new wt(2,2),new st({name:"BackgroundMaterial",uniforms:Ys(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(x.colorSpace)!==ot,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function p(_,v){_.getRGB(ka,Gf(r)),n.buffers.color.setClear(ka.r,ka.g,ka.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(_,v=1){o.set(_),l=v,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(o,l)},render:b,addToRenderList:g}}function qx(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null),s=i,a=!1;function o(y,R,F,k,O){let K=!1,V=u(k,F,R);s!==V&&(s=V,c(s.object)),K=f(y,k,F,O),K&&m(y,k,F,O),O!==null&&e.update(O,r.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,x(y,R,F,k),O!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return r.createVertexArray()}function c(y){return r.bindVertexArray(y)}function h(y){return r.deleteVertexArray(y)}function u(y,R,F){let k=F.wireframe===!0,O=n[y.id];O===void 0&&(O={},n[y.id]=O);let K=O[R.id];K===void 0&&(K={},O[R.id]=K);let V=K[k];return V===void 0&&(V=d(l()),K[k]=V),V}function d(y){let R=[],F=[],k=[];for(let O=0;O<t;O++)R[O]=0,F[O]=0,k[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:F,attributeDivisors:k,object:y,attributes:{},index:null}}function f(y,R,F,k){let O=s.attributes,K=R.attributes,V=0,$=F.getAttributes();for(let W in $)if($[W].location>=0){let oe=O[W],pe=K[W];if(pe===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor)),oe===void 0||oe.attribute!==pe||pe&&oe.data!==pe.data)return!0;V++}return s.attributesNum!==V||s.index!==k}function m(y,R,F,k){let O={},K=R.attributes,V=0,$=F.getAttributes();for(let W in $)if($[W].location>=0){let oe=K[W];oe===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(oe=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(oe=y.instanceColor));let pe={};pe.attribute=oe,oe&&oe.data&&(pe.data=oe.data),O[W]=pe,V++}s.attributes=O,s.attributesNum=V,s.index=k}function b(){let y=s.newAttributes;for(let R=0,F=y.length;R<F;R++)y[R]=0}function g(y){p(y,0)}function p(y,R){let F=s.newAttributes,k=s.enabledAttributes,O=s.attributeDivisors;F[y]=1,k[y]===0&&(r.enableVertexAttribArray(y),k[y]=1),O[y]!==R&&(r.vertexAttribDivisor(y,R),O[y]=R)}function _(){let y=s.newAttributes,R=s.enabledAttributes;for(let F=0,k=R.length;F<k;F++)R[F]!==y[F]&&(r.disableVertexAttribArray(F),R[F]=0)}function v(y,R,F,k,O,K,V){V===!0?r.vertexAttribIPointer(y,R,F,O,K):r.vertexAttribPointer(y,R,F,k,O,K)}function x(y,R,F,k){b();let O=k.attributes,K=F.getAttributes(),V=R.defaultAttributeValues;for(let $ in K){let W=K[$];if(W.location>=0){let ee=O[$];if(ee===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(ee=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(ee=y.instanceColor)),ee!==void 0){let oe=ee.normalized,pe=ee.itemSize,De=e.get(ee);if(De===void 0)continue;let Xe=De.buffer,X=De.type,te=De.bytesPerElement,de=X===r.INT||X===r.UNSIGNED_INT||ee.gpuType===zh;if(ee.isInterleavedBufferAttribute){let se=ee.data,Se=se.stride,Pe=ee.offset;if(se.isInstancedInterleavedBuffer){for(let Ie=0;Ie<W.locationSize;Ie++)p(W.location+Ie,se.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ie=0;Ie<W.locationSize;Ie++)g(W.location+Ie);r.bindBuffer(r.ARRAY_BUFFER,Xe);for(let Ie=0;Ie<W.locationSize;Ie++)v(W.location+Ie,pe/W.locationSize,X,oe,Se*te,(Pe+pe/W.locationSize*Ie)*te,de)}else{if(ee.isInstancedBufferAttribute){for(let se=0;se<W.locationSize;se++)p(W.location+se,ee.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let se=0;se<W.locationSize;se++)g(W.location+se);r.bindBuffer(r.ARRAY_BUFFER,Xe);for(let se=0;se<W.locationSize;se++)v(W.location+se,pe/W.locationSize,X,oe,pe*te,pe/W.locationSize*se*te,de)}}else if(V!==void 0){let oe=V[$];if(oe!==void 0)switch(oe.length){case 2:r.vertexAttrib2fv(W.location,oe);break;case 3:r.vertexAttrib3fv(W.location,oe);break;case 4:r.vertexAttrib4fv(W.location,oe);break;default:r.vertexAttrib1fv(W.location,oe)}}}}_()}function E(){I();for(let y in n){let R=n[y];for(let F in R){let k=R[F];for(let O in k)h(k[O].object),delete k[O];delete R[F]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;let R=n[y.id];for(let F in R){let k=R[F];for(let O in k)h(k[O].object),delete k[O];delete R[F]}delete n[y.id]}function T(y){for(let R in n){let F=n[R];if(F[y.id]===void 0)continue;let k=F[y.id];for(let O in k)h(k[O].object),delete k[O];delete F[y.id]}}function I(){S(),a=!0,s!==i&&(s=i,c(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:S,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:b,enableAttribute:g,disableUnusedAttributes:_}}function Xx(r,e,t){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let b=0;b<u;b++)m+=h[b]*d[b];t.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function jx(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(T){return!(T!==Zt&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let I=T===Pt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Fn&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==kn&&!I)}function l(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),_=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=m>0,w=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:b,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:E,maxSamples:w}}function Yx(r){let e=this,t=null,n=0,i=!1,s=!1,a=new oi,o=new qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,b=u.clipIntersection,g=u.clipShadows,p=r.get(u);if(!i||m===null||m.length===0||s&&!g)s?h(null):c();else{let _=s?0:n,v=_*4,x=p.clippingState||null;l.value=x,x=h(m,d,v,f);for(let E=0;E!==v;++E)x[E]=t[E];p.clippingState=x,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){let b=u!==null?u.length:0,g=null;if(b!==0){if(g=l.value,m!==!0||g===null){let p=f+b*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,x=f;v!==b;++v,x+=4)a.copy(u[v]).applyMatrix4(_,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,g}}function Kx(r){let e=new WeakMap;function t(a,o){return o===Mc?a.mapping=Gs:o===Sc&&(a.mapping=Ws),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Mc||o===Sc)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Wr(l.height);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var Ni=class extends co{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ks=4,Pd=[.125,.215,.35,.446,.526,.582],ns=20,Ql=new Ni,Id=new fe,$l=null,ec=0,tc=0,nc=!1,ts=(1+Math.sqrt(5))/2,As=1/ts,Ld=[new P(-ts,As,0),new P(ts,As,0),new P(-As,0,ts),new P(As,0,ts),new P(0,ts,-As),new P(0,ts,As),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],ki=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){$l=this._renderer.getRenderTarget(),ec=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ud(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget($l,ec,tc),this._renderer.xr.enabled=nc,e.scissorTest=!1,Fa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gs||e.mapping===Ws?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$l=this._renderer.getRenderTarget(),ec=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:Pt,format:Zt,colorSpace:tn,depthBuffer:!1},i=Dd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dd(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zx(s)),this._blurMaterial=Jx(s,e,t)}return i}_compileMaterial(e){let t=new Ne(this._lodPlanes[0],e);this._renderer.compile(t,Ql)}_sceneToCubeUV(e,t,n,i){let o=new Nt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Id),h.toneMapping=Li,h.autoClear=!1;let f=new et({name:"PMREM.Background",side:Jt,depthWrite:!1,depthTest:!1}),m=new Ne(new dt,f),b=!1,g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,b=!0):(f.color.copy(Id),b=!0);for(let p=0;p<6;p++){let _=p%3;_===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):_===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let v=this._cubeSize;Fa(i,_*v,p>2?v:0,v,v),h.setRenderTarget(i),b&&h.render(m,o),h.render(e,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Gs||e.mapping===Ws;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ud());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new Ne(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;Fa(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ql)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ld[(i-s-1)%Ld.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ne(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ns-1),b=s/m,g=isFinite(s)?1+Math.floor(h*b):ns;g>ns&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ns}`);let p=[],_=0;for(let T=0;T<ns;++T){let I=T/b,S=Math.exp(-I*I/2);p.push(S),T===0?_+=S:T<g&&(_+=2*S)}for(let T=0;T<p.length;T++)p[T]=p[T]/_;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:v}=this;d.dTheta.value=m,d.mipInt.value=v-n;let x=this._sizeLods[i],E=3*x*(i>v-ks?i-v+ks:0),w=4*(this._cubeSize-x);Fa(t,E,w,3*x,2*x),l.setRenderTarget(t),l.render(u,Ql)}};function Zx(r){let e=[],t=[],n=[],i=r,s=r-ks+1+Pd.length;for(let a=0;a<s;a++){let o=Math.pow(2,i);t.push(o);let l=1/o;a>r-ks?l=Pd[a-r+ks-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,b=3,g=2,p=1,_=new Float32Array(b*m*f),v=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let w=0;w<f;w++){let T=w%3*2/3-1,I=w>2?0:-1,S=[T,I,0,T+2/3,I,0,T+2/3,I+1,0,T,I,0,T+2/3,I+1,0,T,I+1,0];_.set(S,b*m*w),v.set(d,g*m*w);let y=[w,w,w,w,w,w];x.set(y,p*m*w)}let E=new pt;E.setAttribute("position",new ut(_,b)),E.setAttribute("uv",new ut(v,g)),E.setAttribute("faceIndex",new ut(x,p)),e.push(E),i>ks&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Dd(r,e,t){let n=new Ct(r,e,t);return n.texture.mapping=Xo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fa(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Jx(r,e,t){let n=new Float32Array(ns),i=new P(0,1,0);return new st({name:"SphericalGaussianBlur",defines:{n:ns,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Kh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:kt,depthTest:!1,depthWrite:!1})}function Ud(){return new st({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:kt,depthTest:!1,depthWrite:!1})}function Nd(){return new st({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kt,depthTest:!1,depthWrite:!1})}function Kh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Qx(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Mc||l===Sc,h=l===Gs||l===Ws;if(c||h){let u=e.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new ki(r)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{let f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new ki(r)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function i(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function $x(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Pr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function eb(r,e,t,n){let i={},s=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);for(let m in d.morphAttributes){let b=d.morphAttributes[m];for(let g=0,p=b.length;g<p;g++)e.remove(b[g])}d.removeEventListener("dispose",a),delete i[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let m in d)e.update(d[m],r.ARRAY_BUFFER);let f=u.morphAttributes;for(let m in f){let b=f[m];for(let g=0,p=b.length;g<p;g++)e.update(b[g],r.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,m=u.attributes.position,b=0;if(f!==null){let _=f.array;b=f.version;for(let v=0,x=_.length;v<x;v+=3){let E=_[v+0],w=_[v+1],T=_[v+2];d.push(E,w,w,T,T,E)}}else if(m!==void 0){let _=m.array;b=m.version;for(let v=0,x=_.length/3-1;v<x;v+=3){let E=v+0,w=v+1,T=v+2;d.push(E,w,w,T,T,E)}}else return;let g=new(Hf(d)?lo:oo)(d,1);g.version=b;let p=s.get(u);p&&e.remove(p),s.set(u,g)}function h(u){let d=s.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function tb(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*a),t.update(f,n,1)}function c(d,f,m){m!==0&&(r.drawElementsInstanced(n,f,s,d*a,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,b){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],b[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,b,0,m);let p=0;for(let _=0;_<m;_++)p+=f[_]*b[_];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function nb(r){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function ib(r,e,t){let n=new WeakMap,i=new tt;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let S=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],v=0;f===!0&&(v=1),m===!0&&(v=2),b===!0&&(v=3);let x=o.attributes.position.count*v,E=1;x>e.maxTextureSize&&(E=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let w=new Float32Array(x*E*4*u),T=new ao(w,x,E,u);T.type=kn,T.needsUpdate=!0;let I=v*4;for(let y=0;y<u;y++){let R=g[y],F=p[y],k=_[y],O=x*E*4*y;for(let K=0;K<R.count;K++){let V=K*I;f===!0&&(i.fromBufferAttribute(R,K),w[O+V+0]=i.x,w[O+V+1]=i.y,w[O+V+2]=i.z,w[O+V+3]=0),m===!0&&(i.fromBufferAttribute(F,K),w[O+V+4]=i.x,w[O+V+5]=i.y,w[O+V+6]=i.z,w[O+V+7]=0),b===!0&&(i.fromBufferAttribute(k,K),w[O+V+8]=i.x,w[O+V+9]=i.y,w[O+V+10]=i.z,w[O+V+11]=k.itemSize===4?i.w:1)}}d={count:u,texture:T,size:new G(x,E)},n.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let b=0;b<c.length;b++)f+=c[b];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",m),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function sb(r,e,t,n){let i=new WeakMap;function s(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}var Ks=class extends St{constructor(e,t,n,i,s,a,o,l,c,h=Bs){if(h!==Bs&&h!==Ui)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Bs&&(n=ss),n===void 0&&h===Ui&&(n=Di),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Rt,this.minFilter=l!==void 0?l:Rt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},qf=new St,kd=new Ks(1,1),Xf=new ao,jf=new $c,Yf=new ho,Fd=[],Od=[],Bd=new Float32Array(16),zd=new Float32Array(9),Hd=new Float32Array(4);function ar(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=Fd[i];if(s===void 0&&(s=new Float32Array(i),Fd[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Ot(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Bt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Zo(r,e){let t=Od[e];t===void 0&&(t=new Int32Array(e),Od[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function rb(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function ab(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;r.uniform2fv(this.addr,e),Bt(t,e)}}function ob(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ot(t,e))return;r.uniform3fv(this.addr,e),Bt(t,e)}}function lb(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;r.uniform4fv(this.addr,e),Bt(t,e)}}function cb(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;Hd.set(n),r.uniformMatrix2fv(this.addr,!1,Hd),Bt(t,n)}}function hb(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;zd.set(n),r.uniformMatrix3fv(this.addr,!1,zd),Bt(t,n)}}function ub(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;Bd.set(n),r.uniformMatrix4fv(this.addr,!1,Bd),Bt(t,n)}}function db(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function fb(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;r.uniform2iv(this.addr,e),Bt(t,e)}}function pb(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;r.uniform3iv(this.addr,e),Bt(t,e)}}function mb(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;r.uniform4iv(this.addr,e),Bt(t,e)}}function gb(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function xb(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;r.uniform2uiv(this.addr,e),Bt(t,e)}}function bb(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;r.uniform3uiv(this.addr,e),Bt(t,e)}}function vb(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;r.uniform4uiv(this.addr,e),Bt(t,e)}}function _b(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(kd.compareFunction=Bf,s=kd):s=qf,t.setTexture2D(e||s,i)}function yb(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||jf,i)}function Mb(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Yf,i)}function Sb(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Xf,i)}function wb(r){switch(r){case 5126:return rb;case 35664:return ab;case 35665:return ob;case 35666:return lb;case 35674:return cb;case 35675:return hb;case 35676:return ub;case 5124:case 35670:return db;case 35667:case 35671:return fb;case 35668:case 35672:return pb;case 35669:case 35673:return mb;case 5125:return gb;case 36294:return xb;case 36295:return bb;case 36296:return vb;case 35678:case 36198:case 36298:case 36306:case 35682:return _b;case 35679:case 36299:case 36307:return yb;case 35680:case 36300:case 36308:case 36293:return Mb;case 36289:case 36303:case 36311:case 36292:return Sb}}function Eb(r,e){r.uniform1fv(this.addr,e)}function Tb(r,e){let t=ar(e,this.size,2);r.uniform2fv(this.addr,t)}function Ab(r,e){let t=ar(e,this.size,3);r.uniform3fv(this.addr,t)}function Rb(r,e){let t=ar(e,this.size,4);r.uniform4fv(this.addr,t)}function Cb(r,e){let t=ar(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Pb(r,e){let t=ar(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Ib(r,e){let t=ar(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Lb(r,e){r.uniform1iv(this.addr,e)}function Db(r,e){r.uniform2iv(this.addr,e)}function Ub(r,e){r.uniform3iv(this.addr,e)}function Nb(r,e){r.uniform4iv(this.addr,e)}function kb(r,e){r.uniform1uiv(this.addr,e)}function Fb(r,e){r.uniform2uiv(this.addr,e)}function Ob(r,e){r.uniform3uiv(this.addr,e)}function Bb(r,e){r.uniform4uiv(this.addr,e)}function zb(r,e,t){let n=this.cache,i=e.length,s=Zo(t,i);Ot(n,s)||(r.uniform1iv(this.addr,s),Bt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||qf,s[a])}function Hb(r,e,t){let n=this.cache,i=e.length,s=Zo(t,i);Ot(n,s)||(r.uniform1iv(this.addr,s),Bt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||jf,s[a])}function Vb(r,e,t){let n=this.cache,i=e.length,s=Zo(t,i);Ot(n,s)||(r.uniform1iv(this.addr,s),Bt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Yf,s[a])}function Gb(r,e,t){let n=this.cache,i=e.length,s=Zo(t,i);Ot(n,s)||(r.uniform1iv(this.addr,s),Bt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Xf,s[a])}function Wb(r){switch(r){case 5126:return Eb;case 35664:return Tb;case 35665:return Ab;case 35666:return Rb;case 35674:return Cb;case 35675:return Pb;case 35676:return Ib;case 5124:case 35670:return Lb;case 35667:case 35671:return Db;case 35668:case 35672:return Ub;case 35669:case 35673:return Nb;case 5125:return kb;case 36294:return Fb;case 36295:return Ob;case 36296:return Bb;case 35678:case 36198:case 36298:case 36306:case 35682:return zb;case 35679:case 36299:case 36307:return Hb;case 35680:case 36300:case 36308:case 36293:return Vb;case 36289:case 36303:case 36311:case 36292:return Gb}}var eh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=wb(t.type)}},th=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wb(t.type)}},nh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},ic=/(\w+)(\])?(\[|\.)?/g;function Vd(r,e){r.seq.push(e),r.map[e.id]=e}function qb(r,e,t){let n=r.name,i=n.length;for(ic.lastIndex=0;;){let s=ic.exec(n),a=ic.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Vd(t,c===void 0?new eh(o,r,e):new th(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new nh(o),Vd(t,u)),t=u}}}var Hs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);qb(s,a,this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Gd(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Xb=37297,jb=0;function Yb(r,e){let t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Wd=new qe;function Kb(r){Ke._getMatrix(Wd,Ke.workingColorSpace,r);let e=`mat3( ${Wd.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(r)){case Ko:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function qd(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Yb(r.getShaderSource(e),a)}else return i}function Zb(r,e){let t=Kb(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Jb(r,e){let t;switch(e){case Uh:t="Linear";break;case Nh:t="Reinhard";break;case kh:t="Cineon";break;case Fh:t="ACESFilmic";break;case Oh:t="AgX";break;case ia:t="Neutral";break;case hm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Oa=new P;function Qb(){Ke.getLuminanceCoefficients(Oa);let r=Oa.x.toFixed(4),e=Oa.y.toFixed(4),t=Oa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $b(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ir).join(`
`)}function ev(r){let e=[];for(let t in r){let n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function tv(r,e){let t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(e,i),a=s.name,o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Ir(r){return r!==""}function Xd(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jd(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var nv=/^[ \t]*#include +<([\w\d./]+)>/gm;function ih(r){return r.replace(nv,sv)}var iv=new Map;function sv(r,e){let t=Be[e];if(t===void 0){let n=iv.get(e);if(n!==void 0)t=Be[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ih(t)}var rv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yd(r){return r.replace(rv,av)}function av(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Kd(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ov(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Rf?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Ih?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ai&&(e="SHADOWMAP_TYPE_VSM"),e}function lv(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Gs:case Ws:e="ENVMAP_TYPE_CUBE";break;case Xo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function cv(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===Ws&&(e="ENVMAP_MODE_REFRACTION"),e}function hv(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Dh:e="ENVMAP_BLENDING_MULTIPLY";break;case lm:e="ENVMAP_BLENDING_MIX";break;case cm:e="ENVMAP_BLENDING_ADD";break}return e}function uv(r){let e=r.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function dv(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=ov(t),c=lv(t),h=cv(t),u=hv(t),d=uv(t),f=$b(t),m=ev(s),b=i.createProgram(),g,p,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ir).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ir).join(`
`),p.length>0&&(p+=`
`)):(g=[Kd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ir).join(`
`),p=[Kd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Li?"#define TONE_MAPPING":"",t.toneMapping!==Li?Be.tonemapping_pars_fragment:"",t.toneMapping!==Li?Jb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,Zb("linearToOutputTexel",t.outputColorSpace),Qb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ir).join(`
`)),a=ih(a),a=Xd(a,t),a=jd(a,t),o=ih(o),o=Xd(o,t),o=jd(o,t),a=Yd(a),o=Yd(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===ld?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ld?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=_+g+a,x=_+p+o,E=Gd(i,i.VERTEX_SHADER,v),w=Gd(i,i.FRAGMENT_SHADER,x);i.attachShader(b,E),i.attachShader(b,w),t.index0AttributeName!==void 0?i.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(b,0,"position"),i.linkProgram(b);function T(R){if(r.debug.checkShaderErrors){let F=i.getProgramInfoLog(b).trim(),k=i.getShaderInfoLog(E).trim(),O=i.getShaderInfoLog(w).trim(),K=!0,V=!0;if(i.getProgramParameter(b,i.LINK_STATUS)===!1)if(K=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,b,E,w);else{let $=qd(i,E,"vertex"),W=qd(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(b,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+F+`
`+$+`
`+W)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(k===""||O==="")&&(V=!1);V&&(R.diagnostics={runnable:K,programLog:F,vertexShader:{log:k,prefix:g},fragmentShader:{log:O,prefix:p}})}i.deleteShader(E),i.deleteShader(w),I=new Hs(i,b),S=tv(i,b)}let I;this.getUniforms=function(){return I===void 0&&T(this),I};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(b,Xb)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jb++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=E,this.fragmentShader=w,this}var fv=0,sh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new rh(e),t.set(e,n)),n}},rh=class{constructor(e){this.id=fv++,this.code=e,this.usedTimes=0}};function pv(r,e,t,n,i,s,a){let o=new Vr,l=new sh,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,y,R,F,k){let O=F.fog,K=k.geometry,V=S.isMeshStandardMaterial?F.environment:null,$=(S.isMeshStandardMaterial?t:e).get(S.envMap||V),W=$&&$.mapping===Xo?$.image.height:null,ee=m[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let oe=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,pe=oe!==void 0?oe.length:0,De=0;K.morphAttributes.position!==void 0&&(De=1),K.morphAttributes.normal!==void 0&&(De=2),K.morphAttributes.color!==void 0&&(De=3);let Xe,X,te,de;if(ee){let lt=Gn[ee];Xe=lt.vertexShader,X=lt.fragmentShader}else Xe=S.vertexShader,X=S.fragmentShader,l.update(S),te=l.getVertexShaderID(S),de=l.getFragmentShaderID(S);let se=r.getRenderTarget(),Se=r.state.buffers.depth.getReversed(),Pe=k.isInstancedMesh===!0,Ie=k.isBatchedMesh===!0,Qe=!!S.map,Z=!!S.matcap,re=!!$,L=!!S.aoMap,Ee=!!S.lightMap,ne=!!S.bumpMap,ve=!!S.normalMap,le=!!S.displacementMap,Ue=!!S.emissiveMap,ge=!!S.metalnessMap,C=!!S.roughnessMap,M=S.anisotropy>0,B=S.clearcoat>0,j=S.dispersion>0,Q=S.iridescence>0,Y=S.sheen>0,we=S.transmission>0,he=M&&!!S.anisotropyMap,me=B&&!!S.clearcoatMap,Ve=B&&!!S.clearcoatNormalMap,ie=B&&!!S.clearcoatRoughnessMap,ye=Q&&!!S.iridescenceMap,ke=Q&&!!S.iridescenceThicknessMap,Fe=Y&&!!S.sheenColorMap,Me=Y&&!!S.sheenRoughnessMap,$e=!!S.specularMap,Oe=!!S.specularColorMap,nt=!!S.specularIntensityMap,D=we&&!!S.transmissionMap,ue=we&&!!S.thicknessMap,q=!!S.gradientMap,J=!!S.alphaMap,_e=S.alphaTest>0,xe=!!S.alphaHash,Ge=!!S.extensions,Et=Li;S.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Et=r.toneMapping);let jt={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:Xe,fragmentShader:X,defines:S.defines,customVertexShaderID:te,customFragmentShaderID:de,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ie,batchingColor:Ie&&k._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&k.instanceColor!==null,instancingMorph:Pe&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?r.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:tn,alphaToCoverage:!!S.alphaToCoverage,map:Qe,matcap:Z,envMap:re,envMapMode:re&&$.mapping,envMapCubeUVHeight:W,aoMap:L,lightMap:Ee,bumpMap:ne,normalMap:ve,displacementMap:d&&le,emissiveMap:Ue,normalMapObjectSpace:ve&&S.normalMapType===bm,normalMapTangentSpace:ve&&S.normalMapType===Yo,metalnessMap:ge,roughnessMap:C,anisotropy:M,anisotropyMap:he,clearcoat:B,clearcoatMap:me,clearcoatNormalMap:Ve,clearcoatRoughnessMap:ie,dispersion:j,iridescence:Q,iridescenceMap:ye,iridescenceThicknessMap:ke,sheen:Y,sheenColorMap:Fe,sheenRoughnessMap:Me,specularMap:$e,specularColorMap:Oe,specularIntensityMap:nt,transmission:we,transmissionMap:D,thicknessMap:ue,gradientMap:q,opaque:S.transparent===!1&&S.blending===Os&&S.alphaToCoverage===!1,alphaMap:J,alphaTest:_e,alphaHash:xe,combine:S.combine,mapUv:Qe&&b(S.map.channel),aoMapUv:L&&b(S.aoMap.channel),lightMapUv:Ee&&b(S.lightMap.channel),bumpMapUv:ne&&b(S.bumpMap.channel),normalMapUv:ve&&b(S.normalMap.channel),displacementMapUv:le&&b(S.displacementMap.channel),emissiveMapUv:Ue&&b(S.emissiveMap.channel),metalnessMapUv:ge&&b(S.metalnessMap.channel),roughnessMapUv:C&&b(S.roughnessMap.channel),anisotropyMapUv:he&&b(S.anisotropyMap.channel),clearcoatMapUv:me&&b(S.clearcoatMap.channel),clearcoatNormalMapUv:Ve&&b(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&b(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&b(S.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&b(S.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&b(S.sheenColorMap.channel),sheenRoughnessMapUv:Me&&b(S.sheenRoughnessMap.channel),specularMapUv:$e&&b(S.specularMap.channel),specularColorMapUv:Oe&&b(S.specularColorMap.channel),specularIntensityMapUv:nt&&b(S.specularIntensityMap.channel),transmissionMapUv:D&&b(S.transmissionMap.channel),thicknessMapUv:ue&&b(S.thicknessMap.channel),alphaMapUv:J&&b(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(ve||M),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!K.attributes.uv&&(Qe||J),fog:!!O,useFog:S.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Se,skinning:k.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:De,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&R.length>0,shadowMapType:r.shadowMap.type,toneMapping:Et,decodeVideoTexture:Qe&&S.map.isVideoTexture===!0&&Ke.getTransfer(S.map.colorSpace)===ot,decodeVideoTextureEmissive:Ue&&S.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(S.emissiveMap.colorSpace)===ot,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ht,flipSided:S.side===Jt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ge&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&S.extensions.multiDraw===!0||Ie)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return jt.vertexUv1s=c.has(1),jt.vertexUv2s=c.has(2),jt.vertexUv3s=c.has(3),c.clear(),jt}function p(S){let y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(let R in S.defines)y.push(R),y.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(_(y,S),v(y,S),y.push(r.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function _(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function v(S,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),S.push(o.mask)}function x(S){let y=m[S.type],R;if(y){let F=Gn[y];R=un.clone(F.uniforms)}else R=S.uniforms;return R}function E(S,y){let R;for(let F=0,k=h.length;F<k;F++){let O=h[F];if(O.cacheKey===y){R=O,++R.usedTimes;break}}return R===void 0&&(R=new dv(r,y,S,s),h.push(R)),R}function w(S){if(--S.usedTimes===0){let y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function T(S){l.remove(S)}function I(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:E,releaseProgram:w,releaseShaderCache:T,programs:h,dispose:I}}function mv(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function gv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Zd(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Jd(){let r=[],e=0,t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,m,b,g){let p=r[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:b,group:g},r[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=b,p.group=g),e++,p}function o(u,d,f,m,b,g){let p=a(u,d,f,m,b,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,m,b,g){let p=a(u,d,f,m,b,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||gv),n.length>1&&n.sort(d||Zd),i.length>1&&i.sort(d||Zd)}function h(){for(let u=e,d=r.length;u<d;u++){let f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function xv(){let r=new WeakMap;function e(n,i){let s=r.get(n),a;return s===void 0?(a=new Jd,r.set(n,[a])):i>=s.length?(a=new Jd,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function bv(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new fe};break;case"SpotLight":t={position:new P,direction:new P,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":t={color:new fe,position:new P,halfWidth:new P,halfHeight:new P};break}return r[e.id]=t,t}}}function vv(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}var _v=0;function yv(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Mv(r){let e=new bv,t=vv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let i=new P,s=new Te,a=new Te;function o(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,b=0,g=0,p=0,_=0,v=0,x=0,E=0,w=0,T=0;c.sort(yv);for(let S=0,y=c.length;S<y;S++){let R=c[S],F=R.color,k=R.intensity,O=R.distance,K=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=F.r*k,u+=F.g*k,d+=F.b*k;else if(R.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(R.sh.coefficients[V],k);T++}else if(R.isDirectionalLight){let V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let $=R.shadow,W=t.get(R);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=K,n.directionalShadowMatrix[f]=R.shadow.matrix,_++}n.directional[f]=V,f++}else if(R.isSpotLight){let V=e.get(R);V.position.setFromMatrixPosition(R.matrixWorld),V.color.copy(F).multiplyScalar(k),V.distance=O,V.coneCos=Math.cos(R.angle),V.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),V.decay=R.decay,n.spot[b]=V;let $=R.shadow;if(R.map&&(n.spotLightMap[E]=R.map,E++,$.updateMatrices(R),R.castShadow&&w++),n.spotLightMatrix[b]=$.matrix,R.castShadow){let W=t.get(R);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,n.spotShadow[b]=W,n.spotShadowMap[b]=K,x++}b++}else if(R.isRectAreaLight){let V=e.get(R);V.color.copy(F).multiplyScalar(k),V.halfWidth.set(R.width*.5,0,0),V.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=V,g++}else if(R.isPointLight){let V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),V.distance=R.distance,V.decay=R.decay,R.castShadow){let $=R.shadow,W=t.get(R);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,W.shadowCameraNear=$.camera.near,W.shadowCameraFar=$.camera.far,n.pointShadow[m]=W,n.pointShadowMap[m]=K,n.pointShadowMatrix[m]=R.shadow.matrix,v++}n.point[m]=V,m++}else if(R.isHemisphereLight){let V=e.get(R);V.skyColor.copy(R.color).multiplyScalar(k),V.groundColor.copy(R.groundColor).multiplyScalar(k),n.hemi[p]=V,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let I=n.hash;(I.directionalLength!==f||I.pointLength!==m||I.spotLength!==b||I.rectAreaLength!==g||I.hemiLength!==p||I.numDirectionalShadows!==_||I.numPointShadows!==v||I.numSpotShadows!==x||I.numSpotMaps!==E||I.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=b,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+E-w,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,I.directionalLength=f,I.pointLength=m,I.spotLength=b,I.rectAreaLength=g,I.hemiLength=p,I.numDirectionalShadows=_,I.numPointShadows=v,I.numSpotShadows=x,I.numSpotMaps=E,I.numLightProbes=T,n.version=_v++)}function l(c,h){let u=0,d=0,f=0,m=0,b=0,g=h.matrixWorldInverse;for(let p=0,_=c.length;p<_;p++){let v=c[p];if(v.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),u++}else if(v.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),f++}else if(v.isRectAreaLight){let x=n.rectArea[m];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),a.identity(),s.copy(v.matrixWorld),s.premultiply(g),a.extractRotation(s),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(v.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),d++}else if(v.isHemisphereLight){let x=n.hemi[b];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(g),b++}}}return{setup:o,setupView:l,state:n}}function Qd(r){let e=new Mv(r),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Sv(r){let e=new WeakMap;function t(i,s=0){let a=e.get(i),o;return a===void 0?(o=new Qd(r),e.set(i,[o])):s>=a.length?(o=new Qd(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var ah=class extends $t{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=gm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},oh=class extends $t{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},wv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ev=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tv(r,e,t){let n=new ui,i=new G,s=new G,a=new tt,o=new ah({depthPacking:xm}),l=new oh,c={},h=t.maxTextureSize,u={[qn]:Jt,[Jt]:qn,[Ht]:Ht},d=new st({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G},radius:{value:4}},vertexShader:wv,fragmentShader:Ev}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new pt;m.setAttribute("position",new ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Ne(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rf;let p=this.type;this.render=function(w,T,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;let S=r.getRenderTarget(),y=r.getActiveCubeFace(),R=r.getActiveMipmapLevel(),F=r.state;F.setBlending(kt),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let k=p!==ai&&this.type===ai,O=p===ai&&this.type!==ai;for(let K=0,V=w.length;K<V;K++){let $=w[K],W=$.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);let ee=W.getFrameExtents();if(i.multiply(ee),s.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ee.x),i.x=s.x*ee.x,W.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ee.y),i.y=s.y*ee.y,W.mapSize.y=s.y)),W.map===null||k===!0||O===!0){let pe=this.type!==ai?{minFilter:Rt,magFilter:Rt}:{};W.map!==null&&W.map.dispose(),W.map=new Ct(i.x,i.y,pe),W.map.texture.name=$.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();let oe=W.getViewportCount();for(let pe=0;pe<oe;pe++){let De=W.getViewport(pe);a.set(s.x*De.x,s.y*De.y,s.x*De.z,s.y*De.w),F.viewport(a),W.updateMatrices($,pe),n=W.getFrustum(),x(T,I,W.camera,$,this.type)}W.isPointLightShadow!==!0&&this.type===ai&&_(W,I),W.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(S,y,R)};function _(w,T){let I=e.update(b);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ct(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(T,null,I,d,b,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(T,null,I,f,b,null)}function v(w,T,I,S){let y=null,R=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)y=R;else if(y=I.isPointLight===!0?l:o,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){let F=y.uuid,k=T.uuid,O=c[F];O===void 0&&(O={},c[F]=O);let K=O[k];K===void 0&&(K=y.clone(),O[k]=K,T.addEventListener("dispose",E)),y=K}if(y.visible=T.visible,y.wireframe=T.wireframe,S===ai?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:u[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,I.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let F=r.properties.get(y);F.light=I}return y}function x(w,T,I,S,y){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===ai)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);let k=e.update(w),O=w.material;if(Array.isArray(O)){let K=k.groups;for(let V=0,$=K.length;V<$;V++){let W=K[V],ee=O[W.materialIndex];if(ee&&ee.visible){let oe=v(w,ee,S,y);w.onBeforeShadow(r,w,T,I,k,oe,W),r.renderBufferDirect(I,null,k,oe,w,W),w.onAfterShadow(r,w,T,I,k,oe,W)}}}else if(O.visible){let K=v(w,O,S,y);w.onBeforeShadow(r,w,T,I,k,K,null),r.renderBufferDirect(I,null,k,K,w,null),w.onAfterShadow(r,w,T,I,k,K,null)}}let F=w.children;for(let k=0,O=F.length;k<O;k++)x(F[k],T,I,S,y)}function E(w){w.target.removeEventListener("dispose",E);for(let I in c){let S=c[I],y=w.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}var Av={[mc]:gc,[xc]:_c,[bc]:yc,[Vs]:vc,[gc]:mc,[_c]:xc,[yc]:bc,[vc]:Vs};function Rv(r,e){function t(){let D=!1,ue=new tt,q=null,J=new tt(0,0,0,0);return{setMask:function(_e){q!==_e&&!D&&(r.colorMask(_e,_e,_e,_e),q=_e)},setLocked:function(_e){D=_e},setClear:function(_e,xe,Ge,Et,jt){jt===!0&&(_e*=Et,xe*=Et,Ge*=Et),ue.set(_e,xe,Ge,Et),J.equals(ue)===!1&&(r.clearColor(_e,xe,Ge,Et),J.copy(ue))},reset:function(){D=!1,q=null,J.set(-1,0,0,0)}}}function n(){let D=!1,ue=!1,q=null,J=null,_e=null;return{setReversed:function(xe){if(ue!==xe){let Ge=e.get("EXT_clip_control");ue?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT);let Et=_e;_e=null,this.setClear(Et)}ue=xe},getReversed:function(){return ue},setTest:function(xe){xe?se(r.DEPTH_TEST):Se(r.DEPTH_TEST)},setMask:function(xe){q!==xe&&!D&&(r.depthMask(xe),q=xe)},setFunc:function(xe){if(ue&&(xe=Av[xe]),J!==xe){switch(xe){case mc:r.depthFunc(r.NEVER);break;case gc:r.depthFunc(r.ALWAYS);break;case xc:r.depthFunc(r.LESS);break;case Vs:r.depthFunc(r.LEQUAL);break;case bc:r.depthFunc(r.EQUAL);break;case vc:r.depthFunc(r.GEQUAL);break;case _c:r.depthFunc(r.GREATER);break;case yc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}J=xe}},setLocked:function(xe){D=xe},setClear:function(xe){_e!==xe&&(ue&&(xe=1-xe),r.clearDepth(xe),_e=xe)},reset:function(){D=!1,q=null,J=null,_e=null,ue=!1}}}function i(){let D=!1,ue=null,q=null,J=null,_e=null,xe=null,Ge=null,Et=null,jt=null;return{setTest:function(lt){D||(lt?se(r.STENCIL_TEST):Se(r.STENCIL_TEST))},setMask:function(lt){ue!==lt&&!D&&(r.stencilMask(lt),ue=lt)},setFunc:function(lt,Pn,Qn){(q!==lt||J!==Pn||_e!==Qn)&&(r.stencilFunc(lt,Pn,Qn),q=lt,J=Pn,_e=Qn)},setOp:function(lt,Pn,Qn){(xe!==lt||Ge!==Pn||Et!==Qn)&&(r.stencilOp(lt,Pn,Qn),xe=lt,Ge=Pn,Et=Qn)},setLocked:function(lt){D=lt},setClear:function(lt){jt!==lt&&(r.clearStencil(lt),jt=lt)},reset:function(){D=!1,ue=null,q=null,J=null,_e=null,xe=null,Ge=null,Et=null,jt=null}}}let s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],m=null,b=!1,g=null,p=null,_=null,v=null,x=null,E=null,w=null,T=new fe(0,0,0),I=0,S=!1,y=null,R=null,F=null,k=null,O=null,K=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,$=0,W=r.getParameter(r.VERSION);W.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=$>=1):W.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=$>=2);let ee=null,oe={},pe=r.getParameter(r.SCISSOR_BOX),De=r.getParameter(r.VIEWPORT),Xe=new tt().fromArray(pe),X=new tt().fromArray(De);function te(D,ue,q,J){let _e=new Uint8Array(4),xe=r.createTexture();r.bindTexture(D,xe),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ge=0;Ge<q;Ge++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(ue,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,_e):r.texImage2D(ue+Ge,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,_e);return xe}let de={};de[r.TEXTURE_2D]=te(r.TEXTURE_2D,r.TEXTURE_2D,1),de[r.TEXTURE_CUBE_MAP]=te(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[r.TEXTURE_2D_ARRAY]=te(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),de[r.TEXTURE_3D]=te(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(r.DEPTH_TEST),a.setFunc(Vs),ne(!1),ve(id),se(r.CULL_FACE),L(kt);function se(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function Se(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function Pe(D,ue){return u[D]!==ue?(r.bindFramebuffer(D,ue),u[D]=ue,D===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ue),D===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ue),!0):!1}function Ie(D,ue){let q=f,J=!1;if(D){q=d.get(ue),q===void 0&&(q=[],d.set(ue,q));let _e=D.textures;if(q.length!==_e.length||q[0]!==r.COLOR_ATTACHMENT0){for(let xe=0,Ge=_e.length;xe<Ge;xe++)q[xe]=r.COLOR_ATTACHMENT0+xe;q.length=_e.length,J=!0}}else q[0]!==r.BACK&&(q[0]=r.BACK,J=!0);J&&r.drawBuffers(q)}function Qe(D){return m!==D?(r.useProgram(D),m=D,!0):!1}let Z={[vn]:r.FUNC_ADD,[Yp]:r.FUNC_SUBTRACT,[Kp]:r.FUNC_REVERSE_SUBTRACT};Z[Zp]=r.MIN,Z[Jp]=r.MAX;let re={[rr]:r.ZERO,[Qp]:r.ONE,[$p]:r.SRC_COLOR,[fc]:r.SRC_ALPHA,[im]:r.SRC_ALPHA_SATURATE,[Wo]:r.DST_COLOR,[Go]:r.DST_ALPHA,[em]:r.ONE_MINUS_SRC_COLOR,[pc]:r.ONE_MINUS_SRC_ALPHA,[nm]:r.ONE_MINUS_DST_COLOR,[tm]:r.ONE_MINUS_DST_ALPHA,[sm]:r.CONSTANT_COLOR,[rm]:r.ONE_MINUS_CONSTANT_COLOR,[am]:r.CONSTANT_ALPHA,[om]:r.ONE_MINUS_CONSTANT_ALPHA};function L(D,ue,q,J,_e,xe,Ge,Et,jt,lt){if(D===kt){b===!0&&(Se(r.BLEND),b=!1);return}if(b===!1&&(se(r.BLEND),b=!0),D!==Lh){if(D!==g||lt!==S){if((p!==vn||x!==vn)&&(r.blendEquation(r.FUNC_ADD),p=vn,x=vn),lt)switch(D){case Os:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case is:r.blendFunc(r.ONE,r.ONE);break;case sd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case rd:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Os:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case is:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case sd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case rd:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}_=null,v=null,E=null,w=null,T.set(0,0,0),I=0,g=D,S=lt}return}_e=_e||ue,xe=xe||q,Ge=Ge||J,(ue!==p||_e!==x)&&(r.blendEquationSeparate(Z[ue],Z[_e]),p=ue,x=_e),(q!==_||J!==v||xe!==E||Ge!==w)&&(r.blendFuncSeparate(re[q],re[J],re[xe],re[Ge]),_=q,v=J,E=xe,w=Ge),(Et.equals(T)===!1||jt!==I)&&(r.blendColor(Et.r,Et.g,Et.b,jt),T.copy(Et),I=jt),g=D,S=!1}function Ee(D,ue){D.side===Ht?Se(r.CULL_FACE):se(r.CULL_FACE);let q=D.side===Jt;ue&&(q=!q),ne(q),D.blending===Os&&D.transparent===!1?L(kt):L(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);let J=D.stencilWrite;o.setTest(J),J&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ue(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?se(r.SAMPLE_ALPHA_TO_COVERAGE):Se(r.SAMPLE_ALPHA_TO_COVERAGE)}function ne(D){y!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),y=D)}function ve(D){D!==Xp?(se(r.CULL_FACE),D!==R&&(D===id?r.cullFace(r.BACK):D===jp?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Se(r.CULL_FACE),R=D}function le(D){D!==F&&(V&&r.lineWidth(D),F=D)}function Ue(D,ue,q){D?(se(r.POLYGON_OFFSET_FILL),(k!==ue||O!==q)&&(r.polygonOffset(ue,q),k=ue,O=q)):Se(r.POLYGON_OFFSET_FILL)}function ge(D){D?se(r.SCISSOR_TEST):Se(r.SCISSOR_TEST)}function C(D){D===void 0&&(D=r.TEXTURE0+K-1),ee!==D&&(r.activeTexture(D),ee=D)}function M(D,ue,q){q===void 0&&(ee===null?q=r.TEXTURE0+K-1:q=ee);let J=oe[q];J===void 0&&(J={type:void 0,texture:void 0},oe[q]=J),(J.type!==D||J.texture!==ue)&&(ee!==q&&(r.activeTexture(q),ee=q),r.bindTexture(D,ue||de[D]),J.type=D,J.texture=ue)}function B(){let D=oe[ee];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function j(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Y(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function we(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function he(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function me(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ve(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ie(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ye(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ke(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Fe(D){Xe.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),Xe.copy(D))}function Me(D){X.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),X.copy(D))}function $e(D,ue){let q=c.get(ue);q===void 0&&(q=new WeakMap,c.set(ue,q));let J=q.get(D);J===void 0&&(J=r.getUniformBlockIndex(ue,D.name),q.set(D,J))}function Oe(D,ue){let J=c.get(ue).get(D);l.get(ue)!==J&&(r.uniformBlockBinding(ue,J,D.__bindingPointIndex),l.set(ue,J))}function nt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},ee=null,oe={},u={},d=new WeakMap,f=[],m=null,b=!1,g=null,p=null,_=null,v=null,x=null,E=null,w=null,T=new fe(0,0,0),I=0,S=!1,y=null,R=null,F=null,k=null,O=null,Xe.set(0,0,r.canvas.width,r.canvas.height),X.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:se,disable:Se,bindFramebuffer:Pe,drawBuffers:Ie,useProgram:Qe,setBlending:L,setMaterial:Ee,setFlipSided:ne,setCullFace:ve,setLineWidth:le,setPolygonOffset:Ue,setScissorTest:ge,activeTexture:C,bindTexture:M,unbindTexture:B,compressedTexImage2D:j,compressedTexImage3D:Q,texImage2D:ye,texImage3D:ke,updateUBOMapping:$e,uniformBlockBinding:Oe,texStorage2D:Ve,texStorage3D:ie,texSubImage2D:Y,texSubImage3D:we,compressedTexSubImage2D:he,compressedTexSubImage3D:me,scissor:Fe,viewport:Me,reset:nt}}function $d(r,e,t,n){let i=Cv(n);switch(t){case Lf:return r*e;case Uf:return r*e;case Nf:return r*e*2;case Gh:return r*e/i.components*i.byteLength;case Wh:return r*e/i.components*i.byteLength;case kf:return r*e*2/i.components*i.byteLength;case qh:return r*e*2/i.components*i.byteLength;case Df:return r*e*3/i.components*i.byteLength;case Zt:return r*e*4/i.components*i.byteLength;case Xh:return r*e*4/i.components*i.byteLength;case Qa:case $a:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case eo:case to:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ec:case Ac:return Math.max(r,16)*Math.max(e,8)/4;case wc:case Tc:return Math.max(r,8)*Math.max(e,8)/2;case Rc:case Cc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Pc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ic:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Lc:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Dc:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Nc:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case kc:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Fc:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Oc:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Bc:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case zc:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Hc:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Vc:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Gc:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Wc:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case no:case qc:case Xc:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Ff:case jc:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Yc:case Kc:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Cv(r){switch(r){case Fn:case Cf:return{byteLength:1,components:1};case zr:case Pf:case Pt:return{byteLength:2,components:1};case Hh:case Vh:return{byteLength:2,components:4};case ss:case zh:case kn:return{byteLength:4,components:1};case If:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function Pv(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new G,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,M){return f?new OffscreenCanvas(C,M):Hr("canvas")}function b(C,M,B){let j=1,Q=ge(C);if((Q.width>B||Q.height>B)&&(j=B/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&C instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&C instanceof ImageBitmap||typeof VideoFrame!="undefined"&&C instanceof VideoFrame){let Y=Math.floor(j*Q.width),we=Math.floor(j*Q.height);u===void 0&&(u=m(Y,we));let he=M?m(Y,we):u;return he.width=Y,he.height=we,he.getContext("2d").drawImage(C,0,0,Y,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+we+")."),he}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),C;return C}function g(C){return C.generateMipmaps}function p(C){r.generateMipmap(C)}function _(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function v(C,M,B,j,Q=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Y=M;if(M===r.RED&&(B===r.FLOAT&&(Y=r.R32F),B===r.HALF_FLOAT&&(Y=r.R16F),B===r.UNSIGNED_BYTE&&(Y=r.R8)),M===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(Y=r.R8UI),B===r.UNSIGNED_SHORT&&(Y=r.R16UI),B===r.UNSIGNED_INT&&(Y=r.R32UI),B===r.BYTE&&(Y=r.R8I),B===r.SHORT&&(Y=r.R16I),B===r.INT&&(Y=r.R32I)),M===r.RG&&(B===r.FLOAT&&(Y=r.RG32F),B===r.HALF_FLOAT&&(Y=r.RG16F),B===r.UNSIGNED_BYTE&&(Y=r.RG8)),M===r.RG_INTEGER&&(B===r.UNSIGNED_BYTE&&(Y=r.RG8UI),B===r.UNSIGNED_SHORT&&(Y=r.RG16UI),B===r.UNSIGNED_INT&&(Y=r.RG32UI),B===r.BYTE&&(Y=r.RG8I),B===r.SHORT&&(Y=r.RG16I),B===r.INT&&(Y=r.RG32I)),M===r.RGB_INTEGER&&(B===r.UNSIGNED_BYTE&&(Y=r.RGB8UI),B===r.UNSIGNED_SHORT&&(Y=r.RGB16UI),B===r.UNSIGNED_INT&&(Y=r.RGB32UI),B===r.BYTE&&(Y=r.RGB8I),B===r.SHORT&&(Y=r.RGB16I),B===r.INT&&(Y=r.RGB32I)),M===r.RGBA_INTEGER&&(B===r.UNSIGNED_BYTE&&(Y=r.RGBA8UI),B===r.UNSIGNED_SHORT&&(Y=r.RGBA16UI),B===r.UNSIGNED_INT&&(Y=r.RGBA32UI),B===r.BYTE&&(Y=r.RGBA8I),B===r.SHORT&&(Y=r.RGBA16I),B===r.INT&&(Y=r.RGBA32I)),M===r.RGB&&B===r.UNSIGNED_INT_5_9_9_9_REV&&(Y=r.RGB9_E5),M===r.RGBA){let we=Q?Ko:Ke.getTransfer(j);B===r.FLOAT&&(Y=r.RGBA32F),B===r.HALF_FLOAT&&(Y=r.RGBA16F),B===r.UNSIGNED_BYTE&&(Y=we===ot?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&(Y=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(Y=r.RGB5_A1)}return(Y===r.R16F||Y===r.R32F||Y===r.RG16F||Y===r.RG32F||Y===r.RGBA16F||Y===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function x(C,M){let B;return C?M===null||M===ss||M===Di?B=r.DEPTH24_STENCIL8:M===kn?B=r.DEPTH32F_STENCIL8:M===zr&&(B=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ss||M===Di?B=r.DEPTH_COMPONENT24:M===kn?B=r.DEPTH_COMPONENT32F:M===zr&&(B=r.DEPTH_COMPONENT16),B}function E(C,M){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Rt&&C.minFilter!==Vt?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function w(C){let M=C.target;M.removeEventListener("dispose",w),I(M),M.isVideoTexture&&h.delete(M)}function T(C){let M=C.target;M.removeEventListener("dispose",T),y(M)}function I(C){let M=n.get(C);if(M.__webglInit===void 0)return;let B=C.source,j=d.get(B);if(j){let Q=j[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(C),Object.keys(j).length===0&&d.delete(B)}n.remove(C)}function S(C){let M=n.get(C);r.deleteTexture(M.__webglTexture);let B=C.source,j=d.get(B);delete j[M.__cacheKey],a.memory.textures--}function y(C){let M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(M.__webglFramebuffer[j]))for(let Q=0;Q<M.__webglFramebuffer[j].length;Q++)r.deleteFramebuffer(M.__webglFramebuffer[j][Q]);else r.deleteFramebuffer(M.__webglFramebuffer[j]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[j])}else{if(Array.isArray(M.__webglFramebuffer))for(let j=0;j<M.__webglFramebuffer.length;j++)r.deleteFramebuffer(M.__webglFramebuffer[j]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let j=0;j<M.__webglColorRenderbuffer.length;j++)M.__webglColorRenderbuffer[j]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[j]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let B=C.textures;for(let j=0,Q=B.length;j<Q;j++){let Y=n.get(B[j]);Y.__webglTexture&&(r.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(B[j])}n.remove(C)}let R=0;function F(){R=0}function k(){let C=R;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),R+=1,C}function O(C){let M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function K(C,M){let B=n.get(C);if(C.isVideoTexture&&le(C),C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){let j=C.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(B,C,M);return}}t.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+M)}function V(C,M){let B=n.get(C);if(C.version>0&&B.__version!==C.version){X(B,C,M);return}t.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+M)}function $(C,M){let B=n.get(C);if(C.version>0&&B.__version!==C.version){X(B,C,M);return}t.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+M)}function W(C,M){let B=n.get(C);if(C.version>0&&B.__version!==C.version){te(B,C,M);return}t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+M)}let ee={[Qt]:r.REPEAT,[_n]:r.CLAMP_TO_EDGE,[Br]:r.MIRRORED_REPEAT},oe={[Rt]:r.NEAREST,[Bh]:r.NEAREST_MIPMAP_NEAREST,[Ds]:r.NEAREST_MIPMAP_LINEAR,[Vt]:r.LINEAR,[Lr]:r.LINEAR_MIPMAP_NEAREST,[yn]:r.LINEAR_MIPMAP_LINEAR},pe={[vm]:r.NEVER,[Em]:r.ALWAYS,[_m]:r.LESS,[Bf]:r.LEQUAL,[ym]:r.EQUAL,[wm]:r.GEQUAL,[Mm]:r.GREATER,[Sm]:r.NOTEQUAL};function De(C,M){if(M.type===kn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Vt||M.magFilter===Lr||M.magFilter===Ds||M.magFilter===yn||M.minFilter===Vt||M.minFilter===Lr||M.minFilter===Ds||M.minFilter===yn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,ee[M.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,ee[M.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,ee[M.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,oe[M.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,oe[M.minFilter]),M.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,pe[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Rt||M.minFilter!==Ds&&M.minFilter!==yn||M.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Xe(C,M){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",w));let j=M.source,Q=d.get(j);Q===void 0&&(Q={},d.set(j,Q));let Y=O(M);if(Y!==C.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[Y].usedTimes++;let we=Q[C.__cacheKey];we!==void 0&&(Q[C.__cacheKey].usedTimes--,we.usedTimes===0&&S(M)),C.__cacheKey=Y,C.__webglTexture=Q[Y].texture}return B}function X(C,M,B){let j=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(j=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(j=r.TEXTURE_3D);let Q=Xe(C,M),Y=M.source;t.bindTexture(j,C.__webglTexture,r.TEXTURE0+B);let we=n.get(Y);if(Y.version!==we.__version||Q===!0){t.activeTexture(r.TEXTURE0+B);let he=Ke.getPrimaries(Ke.workingColorSpace),me=M.colorSpace===Wn?null:Ke.getPrimaries(M.colorSpace),Ve=M.colorSpace===Wn||he===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);let ie=b(M.image,!1,i.maxTextureSize);ie=Ue(M,ie);let ye=s.convert(M.format,M.colorSpace),ke=s.convert(M.type),Fe=v(M.internalFormat,ye,ke,M.colorSpace,M.isVideoTexture);De(j,M);let Me,$e=M.mipmaps,Oe=M.isVideoTexture!==!0,nt=we.__version===void 0||Q===!0,D=Y.dataReady,ue=E(M,ie);if(M.isDepthTexture)Fe=x(M.format===Ui,M.type),nt&&(Oe?t.texStorage2D(r.TEXTURE_2D,1,Fe,ie.width,ie.height):t.texImage2D(r.TEXTURE_2D,0,Fe,ie.width,ie.height,0,ye,ke,null));else if(M.isDataTexture)if($e.length>0){Oe&&nt&&t.texStorage2D(r.TEXTURE_2D,ue,Fe,$e[0].width,$e[0].height);for(let q=0,J=$e.length;q<J;q++)Me=$e[q],Oe?D&&t.texSubImage2D(r.TEXTURE_2D,q,0,0,Me.width,Me.height,ye,ke,Me.data):t.texImage2D(r.TEXTURE_2D,q,Fe,Me.width,Me.height,0,ye,ke,Me.data);M.generateMipmaps=!1}else Oe?(nt&&t.texStorage2D(r.TEXTURE_2D,ue,Fe,ie.width,ie.height),D&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ie.width,ie.height,ye,ke,ie.data)):t.texImage2D(r.TEXTURE_2D,0,Fe,ie.width,ie.height,0,ye,ke,ie.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Oe&&nt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ue,Fe,$e[0].width,$e[0].height,ie.depth);for(let q=0,J=$e.length;q<J;q++)if(Me=$e[q],M.format!==Zt)if(ye!==null)if(Oe){if(D)if(M.layerUpdates.size>0){let _e=$d(Me.width,Me.height,M.format,M.type);for(let xe of M.layerUpdates){let Ge=Me.data.subarray(xe*_e/Me.data.BYTES_PER_ELEMENT,(xe+1)*_e/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,xe,Me.width,Me.height,1,ye,Ge)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,Me.width,Me.height,ie.depth,ye,Me.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,q,Fe,Me.width,Me.height,ie.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?D&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,Me.width,Me.height,ie.depth,ye,ke,Me.data):t.texImage3D(r.TEXTURE_2D_ARRAY,q,Fe,Me.width,Me.height,ie.depth,0,ye,ke,Me.data)}else{Oe&&nt&&t.texStorage2D(r.TEXTURE_2D,ue,Fe,$e[0].width,$e[0].height);for(let q=0,J=$e.length;q<J;q++)Me=$e[q],M.format!==Zt?ye!==null?Oe?D&&t.compressedTexSubImage2D(r.TEXTURE_2D,q,0,0,Me.width,Me.height,ye,Me.data):t.compressedTexImage2D(r.TEXTURE_2D,q,Fe,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?D&&t.texSubImage2D(r.TEXTURE_2D,q,0,0,Me.width,Me.height,ye,ke,Me.data):t.texImage2D(r.TEXTURE_2D,q,Fe,Me.width,Me.height,0,ye,ke,Me.data)}else if(M.isDataArrayTexture)if(Oe){if(nt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ue,Fe,ie.width,ie.height,ie.depth),D)if(M.layerUpdates.size>0){let q=$d(ie.width,ie.height,M.format,M.type);for(let J of M.layerUpdates){let _e=ie.data.subarray(J*q/ie.data.BYTES_PER_ELEMENT,(J+1)*q/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,ie.width,ie.height,1,ye,ke,_e)}M.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ye,ke,ie.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Fe,ie.width,ie.height,ie.depth,0,ye,ke,ie.data);else if(M.isData3DTexture)Oe?(nt&&t.texStorage3D(r.TEXTURE_3D,ue,Fe,ie.width,ie.height,ie.depth),D&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ye,ke,ie.data)):t.texImage3D(r.TEXTURE_3D,0,Fe,ie.width,ie.height,ie.depth,0,ye,ke,ie.data);else if(M.isFramebufferTexture){if(nt)if(Oe)t.texStorage2D(r.TEXTURE_2D,ue,Fe,ie.width,ie.height);else{let q=ie.width,J=ie.height;for(let _e=0;_e<ue;_e++)t.texImage2D(r.TEXTURE_2D,_e,Fe,q,J,0,ye,ke,null),q>>=1,J>>=1}}else if($e.length>0){if(Oe&&nt){let q=ge($e[0]);t.texStorage2D(r.TEXTURE_2D,ue,Fe,q.width,q.height)}for(let q=0,J=$e.length;q<J;q++)Me=$e[q],Oe?D&&t.texSubImage2D(r.TEXTURE_2D,q,0,0,ye,ke,Me):t.texImage2D(r.TEXTURE_2D,q,Fe,ye,ke,Me);M.generateMipmaps=!1}else if(Oe){if(nt){let q=ge(ie);t.texStorage2D(r.TEXTURE_2D,ue,Fe,q.width,q.height)}D&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ye,ke,ie)}else t.texImage2D(r.TEXTURE_2D,0,Fe,ye,ke,ie);g(M)&&p(j),we.__version=Y.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function te(C,M,B){if(M.image.length!==6)return;let j=Xe(C,M),Q=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+B);let Y=n.get(Q);if(Q.version!==Y.__version||j===!0){t.activeTexture(r.TEXTURE0+B);let we=Ke.getPrimaries(Ke.workingColorSpace),he=M.colorSpace===Wn?null:Ke.getPrimaries(M.colorSpace),me=M.colorSpace===Wn||we===he?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let Ve=M.isCompressedTexture||M.image[0].isCompressedTexture,ie=M.image[0]&&M.image[0].isDataTexture,ye=[];for(let J=0;J<6;J++)!Ve&&!ie?ye[J]=b(M.image[J],!0,i.maxCubemapSize):ye[J]=ie?M.image[J].image:M.image[J],ye[J]=Ue(M,ye[J]);let ke=ye[0],Fe=s.convert(M.format,M.colorSpace),Me=s.convert(M.type),$e=v(M.internalFormat,Fe,Me,M.colorSpace),Oe=M.isVideoTexture!==!0,nt=Y.__version===void 0||j===!0,D=Q.dataReady,ue=E(M,ke);De(r.TEXTURE_CUBE_MAP,M);let q;if(Ve){Oe&&nt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ue,$e,ke.width,ke.height);for(let J=0;J<6;J++){q=ye[J].mipmaps;for(let _e=0;_e<q.length;_e++){let xe=q[_e];M.format!==Zt?Fe!==null?Oe?D&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e,0,0,xe.width,xe.height,Fe,xe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e,$e,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e,0,0,xe.width,xe.height,Fe,Me,xe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e,$e,xe.width,xe.height,0,Fe,Me,xe.data)}}}else{if(q=M.mipmaps,Oe&&nt){q.length>0&&ue++;let J=ge(ye[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ue,$e,J.width,J.height)}for(let J=0;J<6;J++)if(ie){Oe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ye[J].width,ye[J].height,Fe,Me,ye[J].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,ye[J].width,ye[J].height,0,Fe,Me,ye[J].data);for(let _e=0;_e<q.length;_e++){let Ge=q[_e].image[J].image;Oe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e+1,0,0,Ge.width,Ge.height,Fe,Me,Ge.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e+1,$e,Ge.width,Ge.height,0,Fe,Me,Ge.data)}}else{Oe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Fe,Me,ye[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Fe,Me,ye[J]);for(let _e=0;_e<q.length;_e++){let xe=q[_e];Oe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e+1,0,0,Fe,Me,xe.image[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e+1,$e,Fe,Me,xe.image[J])}}}g(M)&&p(r.TEXTURE_CUBE_MAP),Y.__version=Q.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function de(C,M,B,j,Q,Y){let we=s.convert(B.format,B.colorSpace),he=s.convert(B.type),me=v(B.internalFormat,we,he,B.colorSpace),Ve=n.get(M),ie=n.get(B);if(ie.__renderTarget=M,!Ve.__hasExternalTextures){let ye=Math.max(1,M.width>>Y),ke=Math.max(1,M.height>>Y);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?t.texImage3D(Q,Y,me,ye,ke,M.depth,0,we,he,null):t.texImage2D(Q,Y,me,ye,ke,0,we,he,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),ve(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,j,Q,ie.__webglTexture,0,ne(M)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,j,Q,ie.__webglTexture,Y),t.bindFramebuffer(r.FRAMEBUFFER,null)}function se(C,M,B){if(r.bindRenderbuffer(r.RENDERBUFFER,C),M.depthBuffer){let j=M.depthTexture,Q=j&&j.isDepthTexture?j.type:null,Y=x(M.stencilBuffer,Q),we=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,he=ne(M);ve(M)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,he,Y,M.width,M.height):B?r.renderbufferStorageMultisample(r.RENDERBUFFER,he,Y,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,Y,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,we,r.RENDERBUFFER,C)}else{let j=M.textures;for(let Q=0;Q<j.length;Q++){let Y=j[Q],we=s.convert(Y.format,Y.colorSpace),he=s.convert(Y.type),me=v(Y.internalFormat,we,he,Y.colorSpace),Ve=ne(M);B&&ve(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ve,me,M.width,M.height):ve(M)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ve,me,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,me,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Se(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=n.get(M.depthTexture);j.__renderTarget=M,(!j.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),K(M.depthTexture,0);let Q=j.__webglTexture,Y=ne(M);if(M.depthTexture.format===Bs)ve(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,Y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(M.depthTexture.format===Ui)ve(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,Y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Pe(C){let M=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){let j=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),j){let Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=j}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Se(M.__webglFramebuffer,C)}else if(B){M.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[j]),M.__webglDepthbuffer[j]===void 0)M.__webglDepthbuffer[j]=r.createRenderbuffer(),se(M.__webglDepthbuffer[j],C,!1);else{let Q=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Y=M.__webglDepthbuffer[j];r.bindRenderbuffer(r.RENDERBUFFER,Y),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),se(M.__webglDepthbuffer,C,!1);else{let j=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,Q)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ie(C,M,B){let j=n.get(C);M!==void 0&&de(j.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&Pe(C)}function Qe(C){let M=C.texture,B=n.get(C),j=n.get(M);C.addEventListener("dispose",T);let Q=C.textures,Y=C.isWebGLCubeRenderTarget===!0,we=Q.length>1;if(we||(j.__webglTexture===void 0&&(j.__webglTexture=r.createTexture()),j.__version=M.version,a.memory.textures++),Y){B.__webglFramebuffer=[];for(let he=0;he<6;he++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[he]=[];for(let me=0;me<M.mipmaps.length;me++)B.__webglFramebuffer[he][me]=r.createFramebuffer()}else B.__webglFramebuffer[he]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let he=0;he<M.mipmaps.length;he++)B.__webglFramebuffer[he]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(we)for(let he=0,me=Q.length;he<me;he++){let Ve=n.get(Q[he]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=r.createTexture(),a.memory.textures++)}if(C.samples>0&&ve(C)===!1){B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let he=0;he<Q.length;he++){let me=Q[he];B.__webglColorRenderbuffer[he]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[he]);let Ve=s.convert(me.format,me.colorSpace),ie=s.convert(me.type),ye=v(me.internalFormat,Ve,ie,me.colorSpace,C.isXRRenderTarget===!0),ke=ne(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,ke,ye,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.RENDERBUFFER,B.__webglColorRenderbuffer[he])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),se(B.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Y){t.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture),De(r.TEXTURE_CUBE_MAP,M);for(let he=0;he<6;he++)if(M.mipmaps&&M.mipmaps.length>0)for(let me=0;me<M.mipmaps.length;me++)de(B.__webglFramebuffer[he][me],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+he,me);else de(B.__webglFramebuffer[he],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);g(M)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let he=0,me=Q.length;he<me;he++){let Ve=Q[he],ie=n.get(Ve);t.bindTexture(r.TEXTURE_2D,ie.__webglTexture),De(r.TEXTURE_2D,Ve),de(B.__webglFramebuffer,C,Ve,r.COLOR_ATTACHMENT0+he,r.TEXTURE_2D,0),g(Ve)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let he=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(he=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(he,j.__webglTexture),De(he,M),M.mipmaps&&M.mipmaps.length>0)for(let me=0;me<M.mipmaps.length;me++)de(B.__webglFramebuffer[me],C,M,r.COLOR_ATTACHMENT0,he,me);else de(B.__webglFramebuffer,C,M,r.COLOR_ATTACHMENT0,he,0);g(M)&&p(he),t.unbindTexture()}C.depthBuffer&&Pe(C)}function Z(C){let M=C.textures;for(let B=0,j=M.length;B<j;B++){let Q=M[B];if(g(Q)){let Y=_(C),we=n.get(Q).__webglTexture;t.bindTexture(Y,we),p(Y),t.unbindTexture()}}}let re=[],L=[];function Ee(C){if(C.samples>0){if(ve(C)===!1){let M=C.textures,B=C.width,j=C.height,Q=r.COLOR_BUFFER_BIT,Y=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,we=n.get(C),he=M.length>1;if(he)for(let me=0;me<M.length;me++)t.bindFramebuffer(r.FRAMEBUFFER,we.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,we.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let me=0;me<M.length;me++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),he){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,we.__webglColorRenderbuffer[me]);let Ve=n.get(M[me]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ve,0)}r.blitFramebuffer(0,0,B,j,0,0,B,j,Q,r.NEAREST),l===!0&&(re.length=0,L.length=0,re.push(r.COLOR_ATTACHMENT0+me),C.depthBuffer&&C.resolveDepthBuffer===!1&&(re.push(Y),L.push(Y),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,re))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),he)for(let me=0;me<M.length;me++){t.bindFramebuffer(r.FRAMEBUFFER,we.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,we.__webglColorRenderbuffer[me]);let Ve=n.get(M[me]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,we.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,Ve,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let M=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function ne(C){return Math.min(i.maxSamples,C.samples)}function ve(C){let M=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function le(C){let M=a.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function Ue(C,M){let B=C.colorSpace,j=C.format,Q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==tn&&B!==Wn&&(Ke.getTransfer(B)===ot?(j!==Zt||Q!==Fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function ge(C){return typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame!="undefined"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=F,this.setTexture2D=K,this.setTexture2DArray=V,this.setTexture3D=$,this.setTextureCube=W,this.rebindTextures=Ie,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=de,this.useMultisampledRTT=ve}function Iv(r,e){function t(n,i=Wn){let s,a=Ke.getTransfer(i);if(n===Fn)return r.UNSIGNED_BYTE;if(n===Hh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Vh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===If)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Cf)return r.BYTE;if(n===Pf)return r.SHORT;if(n===zr)return r.UNSIGNED_SHORT;if(n===zh)return r.INT;if(n===ss)return r.UNSIGNED_INT;if(n===kn)return r.FLOAT;if(n===Pt)return r.HALF_FLOAT;if(n===Lf)return r.ALPHA;if(n===Df)return r.RGB;if(n===Zt)return r.RGBA;if(n===Uf)return r.LUMINANCE;if(n===Nf)return r.LUMINANCE_ALPHA;if(n===Bs)return r.DEPTH_COMPONENT;if(n===Ui)return r.DEPTH_STENCIL;if(n===Gh)return r.RED;if(n===Wh)return r.RED_INTEGER;if(n===kf)return r.RG;if(n===qh)return r.RG_INTEGER;if(n===Xh)return r.RGBA_INTEGER;if(n===Qa||n===$a||n===eo||n===to)if(a===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Qa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$a)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===eo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===to)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Qa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$a)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===eo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===to)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wc||n===Ec||n===Tc||n===Ac)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===wc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ec)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Tc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ac)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rc||n===Cc||n===Pc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Rc||n===Cc)return a===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Pc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ic||n===Lc||n===Dc||n===Uc||n===Nc||n===kc||n===Fc||n===Oc||n===Bc||n===zc||n===Hc||n===Vc||n===Gc||n===Wc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ic)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Dc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Nc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===kc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Fc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Bc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Hc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Gc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===no||n===qc||n===Xc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===no)return a===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ff||n===jc||n===Yc||n===Kc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===no)return s.COMPRESSED_RED_RGTC1_EXT;if(n===jc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Kc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Di?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}var lh=class extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Mt=class extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Lv={type:"move"},Nr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let b of e.hand.values()){let g=t.getJointPose(b,n),p=this._getHandJoint(c,b);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Lv)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Dv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Uv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ch=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let i=new St,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new st({vertexShader:Dv,fragmentShader:Uv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ne(new wt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},hh=class extends hi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null,b=new ch,g=t.getContextAttributes(),p=null,_=null,v=[],x=[],E=new G,w=null,T=new Nt;T.viewport=new tt;let I=new Nt;I.viewport=new tt;let S=[T,I],y=new lh,R=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let te=v[X];return te===void 0&&(te=new Nr,v[X]=te),te.getTargetRaySpace()},this.getControllerGrip=function(X){let te=v[X];return te===void 0&&(te=new Nr,v[X]=te),te.getGripSpace()},this.getHand=function(X){let te=v[X];return te===void 0&&(te=new Nr,v[X]=te),te.getHandSpace()};function k(X){let te=x.indexOf(X.inputSource);if(te===-1)return;let de=v[te];de!==void 0&&(de.update(X.inputSource,X.frame,c||a),de.dispatchEvent({type:X.type,data:X.inputSource}))}function O(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",K);for(let X=0;X<v.length;X++){let te=x[X];te!==null&&(x[X]=null,v[X].disconnect(te))}R=null,F=null,b.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,_=null,Xe.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",O),i.addEventListener("inputsourceschange",K),g.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(E),i.renderState.layers===void 0){let te={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,te),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Ct(f.framebufferWidth,f.framebufferHeight,{format:Zt,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let te=null,de=null,se=null;g.depth&&(se=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=g.stencil?Ui:Bs,de=g.stencil?Di:ss);let Se={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Se),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new Ct(d.textureWidth,d.textureHeight,{format:Zt,type:Fn,depthTexture:new Ks(d.textureWidth,d.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Xe.setContext(i),Xe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function K(X){for(let te=0;te<X.removed.length;te++){let de=X.removed[te],se=x.indexOf(de);se>=0&&(x[se]=null,v[se].disconnect(de))}for(let te=0;te<X.added.length;te++){let de=X.added[te],se=x.indexOf(de);if(se===-1){for(let Pe=0;Pe<v.length;Pe++)if(Pe>=x.length){x.push(de),se=Pe;break}else if(x[Pe]===null){x[Pe]=de,se=Pe;break}if(se===-1)break}let Se=v[se];Se&&Se.connect(de)}}let V=new P,$=new P;function W(X,te,de){V.setFromMatrixPosition(te.matrixWorld),$.setFromMatrixPosition(de.matrixWorld);let se=V.distanceTo($),Se=te.projectionMatrix.elements,Pe=de.projectionMatrix.elements,Ie=Se[14]/(Se[10]-1),Qe=Se[14]/(Se[10]+1),Z=(Se[9]+1)/Se[5],re=(Se[9]-1)/Se[5],L=(Se[8]-1)/Se[0],Ee=(Pe[8]+1)/Pe[0],ne=Ie*L,ve=Ie*Ee,le=se/(-L+Ee),Ue=le*-L;if(te.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ue),X.translateZ(le),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Se[10]===-1)X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{let ge=Ie+le,C=Qe+le,M=ne-Ue,B=ve+(se-Ue),j=Z*Qe/C*ge,Q=re*Qe/C*ge;X.projectionMatrix.makePerspective(M,B,j,Q,ge,C),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ee(X,te){te===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(te.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;let te=X.near,de=X.far;b.texture!==null&&(b.depthNear>0&&(te=b.depthNear),b.depthFar>0&&(de=b.depthFar)),y.near=I.near=T.near=te,y.far=I.far=T.far=de,(R!==y.near||F!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,F=y.far),T.layers.mask=X.layers.mask|2,I.layers.mask=X.layers.mask|4,y.layers.mask=T.layers.mask|I.layers.mask;let se=X.parent,Se=y.cameras;ee(y,se);for(let Pe=0;Pe<Se.length;Pe++)ee(Se[Pe],se);Se.length===2?W(y,T,I):y.projectionMatrix.copy(T.projectionMatrix),oe(X,y,se)};function oe(X,te,de){de===null?X.matrix.copy(te.matrixWorld):(X.matrix.copy(de.matrixWorld),X.matrix.invert(),X.matrix.multiply(te.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=js*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(y)};let pe=null;function De(X,te){if(h=te.getViewerPose(c||a),m=te,h!==null){let de=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let se=!1;de.length!==y.cameras.length&&(y.cameras.length=0,se=!0);for(let Pe=0;Pe<de.length;Pe++){let Ie=de[Pe],Qe=null;if(f!==null)Qe=f.getViewport(Ie);else{let re=u.getViewSubImage(d,Ie);Qe=re.viewport,Pe===0&&(e.setRenderTargetTextures(_,re.colorTexture,d.ignoreDepthValues?void 0:re.depthStencilTexture),e.setRenderTarget(_))}let Z=S[Pe];Z===void 0&&(Z=new Nt,Z.layers.enable(Pe),Z.viewport=new tt,S[Pe]=Z),Z.matrix.fromArray(Ie.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(Ie.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),Pe===0&&(y.matrix.copy(Z.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),se===!0&&y.cameras.push(Z)}let Se=i.enabledFeatures;if(Se&&Se.includes("depth-sensing")){let Pe=u.getDepthInformation(de[0]);Pe&&Pe.isValid&&Pe.texture&&b.init(e,Pe,i.renderState)}}for(let de=0;de<v.length;de++){let se=x[de],Se=v[de];se!==null&&Se!==void 0&&Se.update(se,te,c||a)}pe&&pe(X,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),m=null}let Xe=new Wf;Xe.setAnimationLoop(De),this.setAnimationLoop=function(X){pe=X},this.dispose=function(){}}},es=new Wt,Nv=new Te;function kv(r,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Gf(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,_,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),b(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,_,v):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Jt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Jt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let _=e.get(p),v=_.envMap,x=_.envMapRotation;v&&(g.envMap.value=v,es.copy(x),es.x*=-1,es.y*=-1,es.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(es.y*=-1,es.z*=-1),g.envMapRotation.value.setFromMatrix4(Nv.makeRotationFromEuler(es)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,_,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*_,g.scale.value=v*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,_){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Jt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function b(g,p){let _=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Fv(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,v){let x=v.program;n.uniformBlockBinding(_,x)}function c(_,v){let x=i[_.id];x===void 0&&(m(_),x=h(_),i[_.id]=x,_.addEventListener("dispose",g));let E=v.program;n.updateUBOMapping(_,E);let w=e.render.frame;s[_.id]!==w&&(d(_),s[_.id]=w)}function h(_){let v=u();_.__bindingPointIndex=v;let x=r.createBuffer(),E=_.__size,w=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,E,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,x),x}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let v=i[_.id],x=_.uniforms,E=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let w=0,T=x.length;w<T;w++){let I=Array.isArray(x[w])?x[w]:[x[w]];for(let S=0,y=I.length;S<y;S++){let R=I[S];if(f(R,w,S,E)===!0){let F=R.__offset,k=Array.isArray(R.value)?R.value:[R.value],O=0;for(let K=0;K<k.length;K++){let V=k[K],$=b(V);typeof V=="number"||typeof V=="boolean"?(R.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,F+O,R.__data)):V.isMatrix3?(R.__data[0]=V.elements[0],R.__data[1]=V.elements[1],R.__data[2]=V.elements[2],R.__data[3]=0,R.__data[4]=V.elements[3],R.__data[5]=V.elements[4],R.__data[6]=V.elements[5],R.__data[7]=0,R.__data[8]=V.elements[6],R.__data[9]=V.elements[7],R.__data[10]=V.elements[8],R.__data[11]=0):(V.toArray(R.__data,O),O+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,R.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(_,v,x,E){let w=_.value,T=v+"_"+x;if(E[T]===void 0)return typeof w=="number"||typeof w=="boolean"?E[T]=w:E[T]=w.clone(),!0;{let I=E[T];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return E[T]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function m(_){let v=_.uniforms,x=0,E=16;for(let T=0,I=v.length;T<I;T++){let S=Array.isArray(v[T])?v[T]:[v[T]];for(let y=0,R=S.length;y<R;y++){let F=S[y],k=Array.isArray(F.value)?F.value:[F.value];for(let O=0,K=k.length;O<K;O++){let V=k[O],$=b(V),W=x%E,ee=W%$.boundary,oe=W+ee;x+=ee,oe!==0&&E-oe<$.storage&&(x+=E-oe),F.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=$.storage}}}let w=x%E;return w>0&&(x+=E-w),_.__size=x,_.__cache={},this}function b(_){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function g(_){let v=_.target;v.removeEventListener("dispose",g);let x=a.indexOf(v.__bindingPointIndex);a.splice(x,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function p(){for(let _ in i)r.deleteBuffer(i[_]);a=[],i={},s={}}return{bind:l,update:c,dispose:p}}var uo=class{constructor(e={}){let{canvas:t=Vm(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let m=new Uint32Array(4),b=new Int32Array(4),g=null,p=null,_=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=je,this.toneMapping=Li,this.toneMappingExposure=1;let x=this,E=!1,w=0,T=0,I=null,S=-1,y=null,R=new tt,F=new tt,k=null,O=new fe(0),K=0,V=t.width,$=t.height,W=1,ee=null,oe=null,pe=new tt(0,0,V,$),De=new tt(0,0,V,$),Xe=!1,X=new ui,te=!1,de=!1,se=new Te,Se=new Te,Pe=new P,Ie=new tt,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Z=!1;function re(){return I===null?W:1}let L=n;function Ee(A,U){return t.getContext(A,U)}try{let A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",_e,!1),t.addEventListener("webglcontextcreationerror",xe,!1),L===null){let U="webgl2";if(L=Ee(U,A),L===null)throw Ee(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let ne,ve,le,Ue,ge,C,M,B,j,Q,Y,we,he,me,Ve,ie,ye,ke,Fe,Me,$e,Oe,nt,D;function ue(){ne=new $x(L),ne.init(),Oe=new Iv(L,ne),ve=new jx(L,ne,e,Oe),le=new Rv(L,ne),ve.reverseDepthBuffer&&d&&le.buffers.depth.setReversed(!0),Ue=new nb(L),ge=new mv,C=new Pv(L,ne,le,ge,ve,Oe,Ue),M=new Kx(x),B=new Qx(x),j=new cg(L),nt=new qx(L,j),Q=new eb(L,j,Ue,nt),Y=new sb(L,Q,j,Ue),Fe=new ib(L,ve,C),ie=new Yx(ge),we=new pv(x,M,B,ne,ve,nt,ie),he=new kv(x,ge),me=new xv,Ve=new Sv(ne),ke=new Wx(x,M,B,le,Y,f,l),ye=new Tv(x,Y,ve),D=new Fv(L,Ue,ve,le),Me=new Xx(L,ne,Ue),$e=new tb(L,ne,Ue),Ue.programs=we.programs,x.capabilities=ve,x.extensions=ne,x.properties=ge,x.renderLists=me,x.shadowMap=ye,x.state=le,x.info=Ue}ue();let q=new hh(x,L);this.xr=q,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let A=ne.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=ne.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(A){A!==void 0&&(W=A,this.setSize(V,$,!1))},this.getSize=function(A){return A.set(V,$)},this.setSize=function(A,U,z=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=A,$=U,t.width=Math.floor(A*W),t.height=Math.floor(U*W),z===!0&&(t.style.width=A+"px",t.style.height=U+"px"),this.setViewport(0,0,A,U)},this.getDrawingBufferSize=function(A){return A.set(V*W,$*W).floor()},this.setDrawingBufferSize=function(A,U,z){V=A,$=U,W=z,t.width=Math.floor(A*z),t.height=Math.floor(U*z),this.setViewport(0,0,A,U)},this.getCurrentViewport=function(A){return A.copy(R)},this.getViewport=function(A){return A.copy(pe)},this.setViewport=function(A,U,z,H){A.isVector4?pe.set(A.x,A.y,A.z,A.w):pe.set(A,U,z,H),le.viewport(R.copy(pe).multiplyScalar(W).round())},this.getScissor=function(A){return A.copy(De)},this.setScissor=function(A,U,z,H){A.isVector4?De.set(A.x,A.y,A.z,A.w):De.set(A,U,z,H),le.scissor(F.copy(De).multiplyScalar(W).round())},this.getScissorTest=function(){return Xe},this.setScissorTest=function(A){le.setScissorTest(Xe=A)},this.setOpaqueSort=function(A){ee=A},this.setTransparentSort=function(A){oe=A},this.getClearColor=function(A){return A.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor.apply(ke,arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha.apply(ke,arguments)},this.clear=function(A=!0,U=!0,z=!0){let H=0;if(A){let N=!1;if(I!==null){let ae=I.texture.format;N=ae===Xh||ae===qh||ae===Wh}if(N){let ae=I.texture.type,be=ae===Fn||ae===ss||ae===zr||ae===Di||ae===Hh||ae===Vh,Ae=ke.getClearColor(),Re=ke.getClearAlpha(),ze=Ae.r,We=Ae.g,Ce=Ae.b;be?(m[0]=ze,m[1]=We,m[2]=Ce,m[3]=Re,L.clearBufferuiv(L.COLOR,0,m)):(b[0]=ze,b[1]=We,b[2]=Ce,b[3]=Re,L.clearBufferiv(L.COLOR,0,b))}else H|=L.COLOR_BUFFER_BIT}U&&(H|=L.DEPTH_BUFFER_BIT),z&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",_e,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),me.dispose(),Ve.dispose(),ge.dispose(),M.dispose(),B.dispose(),Y.dispose(),nt.dispose(),D.dispose(),we.dispose(),q.dispose(),q.removeEventListener("sessionstart",Ku),q.removeEventListener("sessionend",Zu),Yi.stop()};function J(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function _e(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let A=Ue.autoReset,U=ye.enabled,z=ye.autoUpdate,H=ye.needsUpdate,N=ye.type;ue(),Ue.autoReset=A,ye.enabled=U,ye.autoUpdate=z,ye.needsUpdate=H,ye.type=N}function xe(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ge(A){let U=A.target;U.removeEventListener("dispose",Ge),Et(U)}function Et(A){jt(A),ge.remove(A)}function jt(A){let U=ge.get(A).programs;U!==void 0&&(U.forEach(function(z){we.releaseProgram(z)}),A.isShaderMaterial&&we.releaseShaderCache(A))}this.renderBufferDirect=function(A,U,z,H,N,ae){U===null&&(U=Qe);let be=N.isMesh&&N.matrixWorld.determinant()<0,Ae=Gp(A,U,z,H,N);le.setMaterial(H,be);let Re=z.index,ze=1;if(H.wireframe===!0){if(Re=Q.getWireframeAttribute(z),Re===void 0)return;ze=2}let We=z.drawRange,Ce=z.attributes.position,it=We.start*ze,mt=(We.start+We.count)*ze;ae!==null&&(it=Math.max(it,ae.start*ze),mt=Math.min(mt,(ae.start+ae.count)*ze)),Re!==null?(it=Math.max(it,0),mt=Math.min(mt,Re.count)):Ce!=null&&(it=Math.max(it,0),mt=Math.min(mt,Ce.count));let xt=mt-it;if(xt<0||xt===1/0)return;nt.setup(N,H,Ae,z,Re);let cn,rt=Me;if(Re!==null&&(cn=j.get(Re),rt=$e,rt.setIndex(cn)),N.isMesh)H.wireframe===!0?(le.setLineWidth(H.wireframeLinewidth*re()),rt.setMode(L.LINES)):rt.setMode(L.TRIANGLES);else if(N.isLine){let Le=H.linewidth;Le===void 0&&(Le=1),le.setLineWidth(Le*re()),N.isLineSegments?rt.setMode(L.LINES):N.isLineLoop?rt.setMode(L.LINE_LOOP):rt.setMode(L.LINE_STRIP)}else N.isPoints?rt.setMode(L.POINTS):N.isSprite&&rt.setMode(L.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)rt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))rt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let Le=N._multiDrawStarts,$n=N._multiDrawCounts,at=N._multiDrawCount,In=Re?j.get(Re).bytesPerElement:1,fs=ge.get(H).currentProgram.getUniforms();for(let dn=0;dn<at;dn++)fs.setValue(L,"_gl_DrawID",dn),rt.render(Le[dn]/In,$n[dn])}else if(N.isInstancedMesh)rt.renderInstances(it,xt,N.count);else if(z.isInstancedBufferGeometry){let Le=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,$n=Math.min(z.instanceCount,Le);rt.renderInstances(it,xt,$n)}else rt.render(it,xt)};function lt(A,U,z){A.transparent===!0&&A.side===Ht&&A.forceSinglePass===!1?(A.side=Jt,A.needsUpdate=!0,ba(A,U,z),A.side=qn,A.needsUpdate=!0,ba(A,U,z),A.side=Ht):ba(A,U,z)}this.compile=function(A,U,z=null){z===null&&(z=A),p=Ve.get(z),p.init(U),v.push(p),z.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),A!==z&&A.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();let H=new Set;return A.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let ae=N.material;if(ae)if(Array.isArray(ae))for(let be=0;be<ae.length;be++){let Ae=ae[be];lt(Ae,z,N),H.add(Ae)}else lt(ae,z,N),H.add(ae)}),v.pop(),p=null,H},this.compileAsync=function(A,U,z=null){let H=this.compile(A,U,z);return new Promise(N=>{function ae(){if(H.forEach(function(be){ge.get(be).currentProgram.isReady()&&H.delete(be)}),H.size===0){N(A);return}setTimeout(ae,10)}ne.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Pn=null;function Qn(A){Pn&&Pn(A)}function Ku(){Yi.stop()}function Zu(){Yi.start()}let Yi=new Wf;Yi.setAnimationLoop(Qn),typeof self!="undefined"&&Yi.setContext(self),this.setAnimationLoop=function(A){Pn=A,q.setAnimationLoop(A),A===null?Yi.stop():Yi.start()},q.addEventListener("sessionstart",Ku),q.addEventListener("sessionend",Zu),this.render=function(A,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(U),U=q.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,U,I),p=Ve.get(A,v.length),p.init(U),v.push(p),Se.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(Se),de=this.localClippingEnabled,te=ie.init(this.clippingPlanes,de),g=me.get(A,_.length),g.init(),_.push(g),q.enabled===!0&&q.isPresenting===!0){let ae=x.xr.getDepthSensingMesh();ae!==null&&Pl(ae,U,-1/0,x.sortObjects)}Pl(A,U,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ee,oe),Z=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Z&&ke.addToRenderList(g,A),this.info.render.frame++,te===!0&&ie.beginShadows();let z=p.state.shadowsArray;ye.render(z,A,U),te===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=g.opaque,N=g.transmissive;if(p.setupLights(),U.isArrayCamera){let ae=U.cameras;if(N.length>0)for(let be=0,Ae=ae.length;be<Ae;be++){let Re=ae[be];Qu(H,N,A,Re)}Z&&ke.render(A);for(let be=0,Ae=ae.length;be<Ae;be++){let Re=ae[be];Ju(g,A,Re,Re.viewport)}}else N.length>0&&Qu(H,N,A,U),Z&&ke.render(A),Ju(g,A,U);I!==null&&(C.updateMultisampleRenderTarget(I),C.updateRenderTargetMipmap(I)),A.isScene===!0&&A.onAfterRender(x,A,U),nt.resetDefaultState(),S=-1,y=null,v.pop(),v.length>0?(p=v[v.length-1],te===!0&&ie.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function Pl(A,U,z,H){if(A.visible===!1)return;if(A.layers.test(U.layers)){if(A.isGroup)z=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(U);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||X.intersectsSprite(A)){H&&Ie.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Se);let be=Y.update(A),Ae=A.material;Ae.visible&&g.push(A,be,Ae,z,Ie.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||X.intersectsObject(A))){let be=Y.update(A),Ae=A.material;if(H&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ie.copy(A.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Ie.copy(be.boundingSphere.center)),Ie.applyMatrix4(A.matrixWorld).applyMatrix4(Se)),Array.isArray(Ae)){let Re=be.groups;for(let ze=0,We=Re.length;ze<We;ze++){let Ce=Re[ze],it=Ae[Ce.materialIndex];it&&it.visible&&g.push(A,be,it,z,Ie.z,Ce)}}else Ae.visible&&g.push(A,be,Ae,z,Ie.z,null)}}let ae=A.children;for(let be=0,Ae=ae.length;be<Ae;be++)Pl(ae[be],U,z,H)}function Ju(A,U,z,H){let N=A.opaque,ae=A.transmissive,be=A.transparent;p.setupLightsView(z),te===!0&&ie.setGlobalState(x.clippingPlanes,z),H&&le.viewport(R.copy(H)),N.length>0&&xa(N,U,z),ae.length>0&&xa(ae,U,z),be.length>0&&xa(be,U,z),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function Qu(A,U,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new Ct(1,1,{generateMipmaps:!0,type:ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float")?Pt:Fn,minFilter:yn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));let ae=p.state.transmissionRenderTarget[H.id],be=H.viewport||R;ae.setSize(be.z,be.w);let Ae=x.getRenderTarget();x.setRenderTarget(ae),x.getClearColor(O),K=x.getClearAlpha(),K<1&&x.setClearColor(16777215,.5),x.clear(),Z&&ke.render(z);let Re=x.toneMapping;x.toneMapping=Li;let ze=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),te===!0&&ie.setGlobalState(x.clippingPlanes,H),xa(A,z,H),C.updateMultisampleRenderTarget(ae),C.updateRenderTargetMipmap(ae),ne.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Ce=0,it=U.length;Ce<it;Ce++){let mt=U[Ce],xt=mt.object,cn=mt.geometry,rt=mt.material,Le=mt.group;if(rt.side===Ht&&xt.layers.test(H.layers)){let $n=rt.side;rt.side=Jt,rt.needsUpdate=!0,$u(xt,z,H,cn,rt,Le),rt.side=$n,rt.needsUpdate=!0,We=!0}}We===!0&&(C.updateMultisampleRenderTarget(ae),C.updateRenderTargetMipmap(ae))}x.setRenderTarget(Ae),x.setClearColor(O,K),ze!==void 0&&(H.viewport=ze),x.toneMapping=Re}function xa(A,U,z){let H=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ae=A.length;N<ae;N++){let be=A[N],Ae=be.object,Re=be.geometry,ze=H===null?be.material:H,We=be.group;Ae.layers.test(z.layers)&&$u(Ae,U,z,Re,ze,We)}}function $u(A,U,z,H,N,ae){A.onBeforeRender(x,U,z,H,N,ae),A.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),N.onBeforeRender(x,U,z,H,A,ae),N.transparent===!0&&N.side===Ht&&N.forceSinglePass===!1?(N.side=Jt,N.needsUpdate=!0,x.renderBufferDirect(z,U,H,N,A,ae),N.side=qn,N.needsUpdate=!0,x.renderBufferDirect(z,U,H,N,A,ae),N.side=Ht):x.renderBufferDirect(z,U,H,N,A,ae),A.onAfterRender(x,U,z,H,N,ae)}function ba(A,U,z){U.isScene!==!0&&(U=Qe);let H=ge.get(A),N=p.state.lights,ae=p.state.shadowsArray,be=N.state.version,Ae=we.getParameters(A,N.state,ae,U,z),Re=we.getProgramCacheKey(Ae),ze=H.programs;H.environment=A.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(A.isMeshStandardMaterial?B:M).get(A.envMap||H.environment),H.envMapRotation=H.environment!==null&&A.envMap===null?U.environmentRotation:A.envMapRotation,ze===void 0&&(A.addEventListener("dispose",Ge),ze=new Map,H.programs=ze);let We=ze.get(Re);if(We!==void 0){if(H.currentProgram===We&&H.lightsStateVersion===be)return td(A,Ae),We}else Ae.uniforms=we.getUniforms(A),A.onBeforeCompile(Ae,x),We=we.acquireProgram(Ae,Re),ze.set(Re,We),H.uniforms=Ae.uniforms;let Ce=H.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ce.clippingPlanes=ie.uniform),td(A,Ae),H.needsLights=qp(A),H.lightsStateVersion=be,H.needsLights&&(Ce.ambientLightColor.value=N.state.ambient,Ce.lightProbe.value=N.state.probe,Ce.directionalLights.value=N.state.directional,Ce.directionalLightShadows.value=N.state.directionalShadow,Ce.spotLights.value=N.state.spot,Ce.spotLightShadows.value=N.state.spotShadow,Ce.rectAreaLights.value=N.state.rectArea,Ce.ltc_1.value=N.state.rectAreaLTC1,Ce.ltc_2.value=N.state.rectAreaLTC2,Ce.pointLights.value=N.state.point,Ce.pointLightShadows.value=N.state.pointShadow,Ce.hemisphereLights.value=N.state.hemi,Ce.directionalShadowMap.value=N.state.directionalShadowMap,Ce.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ce.spotShadowMap.value=N.state.spotShadowMap,Ce.spotLightMatrix.value=N.state.spotLightMatrix,Ce.spotLightMap.value=N.state.spotLightMap,Ce.pointShadowMap.value=N.state.pointShadowMap,Ce.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=We,H.uniformsList=null,We}function ed(A){if(A.uniformsList===null){let U=A.currentProgram.getUniforms();A.uniformsList=Hs.seqWithValue(U.seq,A.uniforms)}return A.uniformsList}function td(A,U){let z=ge.get(A);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function Gp(A,U,z,H,N){U.isScene!==!0&&(U=Qe),C.resetTextureUnits();let ae=U.fog,be=H.isMeshStandardMaterial?U.environment:null,Ae=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:tn,Re=(H.isMeshStandardMaterial?B:M).get(H.envMap||be),ze=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,We=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ce=!!z.morphAttributes.position,it=!!z.morphAttributes.normal,mt=!!z.morphAttributes.color,xt=Li;H.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(xt=x.toneMapping);let cn=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,rt=cn!==void 0?cn.length:0,Le=ge.get(H),$n=p.state.lights;if(te===!0&&(de===!0||A!==y)){let xn=A===y&&H.id===S;ie.setState(H,A,xn)}let at=!1;H.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==$n.state.version||Le.outputColorSpace!==Ae||N.isBatchedMesh&&Le.batching===!1||!N.isBatchedMesh&&Le.batching===!0||N.isBatchedMesh&&Le.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Le.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Le.instancing===!1||!N.isInstancedMesh&&Le.instancing===!0||N.isSkinnedMesh&&Le.skinning===!1||!N.isSkinnedMesh&&Le.skinning===!0||N.isInstancedMesh&&Le.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Le.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Le.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Le.instancingMorph===!1&&N.morphTexture!==null||Le.envMap!==Re||H.fog===!0&&Le.fog!==ae||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ie.numPlanes||Le.numIntersection!==ie.numIntersection)||Le.vertexAlphas!==ze||Le.vertexTangents!==We||Le.morphTargets!==Ce||Le.morphNormals!==it||Le.morphColors!==mt||Le.toneMapping!==xt||Le.morphTargetsCount!==rt)&&(at=!0):(at=!0,Le.__version=H.version);let In=Le.currentProgram;at===!0&&(In=ba(H,U,N));let fs=!1,dn=!1,xr=!1,bt=In.getUniforms(),Vn=Le.uniforms;if(le.useProgram(In.program)&&(fs=!0,dn=!0,xr=!0),H.id!==S&&(S=H.id,dn=!0),fs||y!==A){le.buffers.depth.getReversed()?(se.copy(A.projectionMatrix),Wm(se),qm(se),bt.setValue(L,"projectionMatrix",se)):bt.setValue(L,"projectionMatrix",A.projectionMatrix),bt.setValue(L,"viewMatrix",A.matrixWorldInverse);let Mi=bt.map.cameraPosition;Mi!==void 0&&Mi.setValue(L,Pe.setFromMatrixPosition(A.matrixWorld)),ve.logarithmicDepthBuffer&&bt.setValue(L,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&bt.setValue(L,"isOrthographic",A.isOrthographicCamera===!0),y!==A&&(y=A,dn=!0,xr=!0)}if(N.isSkinnedMesh){bt.setOptional(L,N,"bindMatrix"),bt.setOptional(L,N,"bindMatrixInverse");let xn=N.skeleton;xn&&(xn.boneTexture===null&&xn.computeBoneTexture(),bt.setValue(L,"boneTexture",xn.boneTexture,C))}N.isBatchedMesh&&(bt.setOptional(L,N,"batchingTexture"),bt.setValue(L,"batchingTexture",N._matricesTexture,C),bt.setOptional(L,N,"batchingIdTexture"),bt.setValue(L,"batchingIdTexture",N._indirectTexture,C),bt.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&bt.setValue(L,"batchingColorTexture",N._colorsTexture,C));let br=z.morphAttributes;if((br.position!==void 0||br.normal!==void 0||br.color!==void 0)&&Fe.update(N,z,In),(dn||Le.receiveShadow!==N.receiveShadow)&&(Le.receiveShadow=N.receiveShadow,bt.setValue(L,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Vn.envMap.value=Re,Vn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(Vn.envMapIntensity.value=U.environmentIntensity),dn&&(bt.setValue(L,"toneMappingExposure",x.toneMappingExposure),Le.needsLights&&Wp(Vn,xr),ae&&H.fog===!0&&he.refreshFogUniforms(Vn,ae),he.refreshMaterialUniforms(Vn,H,W,$,p.state.transmissionRenderTarget[A.id]),Hs.upload(L,ed(Le),Vn,C)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Hs.upload(L,ed(Le),Vn,C),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&bt.setValue(L,"center",N.center),bt.setValue(L,"modelViewMatrix",N.modelViewMatrix),bt.setValue(L,"normalMatrix",N.normalMatrix),bt.setValue(L,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let xn=H.uniformsGroups;for(let Mi=0,Si=xn.length;Mi<Si;Mi++){let nd=xn[Mi];D.update(nd,In),D.bind(nd,In)}}return In}function Wp(A,U){A.ambientLightColor.needsUpdate=U,A.lightProbe.needsUpdate=U,A.directionalLights.needsUpdate=U,A.directionalLightShadows.needsUpdate=U,A.pointLights.needsUpdate=U,A.pointLightShadows.needsUpdate=U,A.spotLights.needsUpdate=U,A.spotLightShadows.needsUpdate=U,A.rectAreaLights.needsUpdate=U,A.hemisphereLights.needsUpdate=U}function qp(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(A,U,z){ge.get(A.texture).__webglTexture=U,ge.get(A.depthTexture).__webglTexture=z;let H=ge.get(A);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,U){let z=ge.get(A);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(A,U=0,z=0){I=A,w=U,T=z;let H=!0,N=null,ae=!1,be=!1;if(A){let Re=ge.get(A);if(Re.__useDefaultFramebuffer!==void 0)le.bindFramebuffer(L.FRAMEBUFFER,null),H=!1;else if(Re.__webglFramebuffer===void 0)C.setupRenderTarget(A);else if(Re.__hasExternalTextures)C.rebindTextures(A,ge.get(A.texture).__webglTexture,ge.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Ce=A.depthTexture;if(Re.__boundDepthTexture!==Ce){if(Ce!==null&&ge.has(Ce)&&(A.width!==Ce.image.width||A.height!==Ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(A)}}let ze=A.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(be=!0);let We=ge.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(We[U])?N=We[U][z]:N=We[U],ae=!0):A.samples>0&&C.useMultisampledRTT(A)===!1?N=ge.get(A).__webglMultisampledFramebuffer:Array.isArray(We)?N=We[z]:N=We,R.copy(A.viewport),F.copy(A.scissor),k=A.scissorTest}else R.copy(pe).multiplyScalar(W).floor(),F.copy(De).multiplyScalar(W).floor(),k=Xe;if(le.bindFramebuffer(L.FRAMEBUFFER,N)&&H&&le.drawBuffers(A,N),le.viewport(R),le.scissor(F),le.setScissorTest(k),ae){let Re=ge.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,Re.__webglTexture,z)}else if(be){let Re=ge.get(A.texture),ze=U||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Re.__webglTexture,z||0,ze)}S=-1},this.readRenderTargetPixels=function(A,U,z,H,N,ae,be){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&be!==void 0&&(Ae=Ae[be]),Ae){le.bindFramebuffer(L.FRAMEBUFFER,Ae);try{let Re=A.texture,ze=Re.format,We=Re.type;if(!ve.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ve.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=A.width-H&&z>=0&&z<=A.height-N&&L.readPixels(U,z,H,N,Oe.convert(ze),Oe.convert(We),ae)}finally{let Re=I!==null?ge.get(I).__webglFramebuffer:null;le.bindFramebuffer(L.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(A,U,z,H,N,ae,be){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&be!==void 0&&(Ae=Ae[be]),Ae){let Re=A.texture,ze=Re.format,We=Re.type;if(!ve.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ve.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=A.width-H&&z>=0&&z<=A.height-N){le.bindFramebuffer(L.FRAMEBUFFER,Ae);let Ce=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ce),L.bufferData(L.PIXEL_PACK_BUFFER,ae.byteLength,L.STREAM_READ),L.readPixels(U,z,H,N,Oe.convert(ze),Oe.convert(We),0);let it=I!==null?ge.get(I).__webglFramebuffer:null;le.bindFramebuffer(L.FRAMEBUFFER,it);let mt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Gm(L,mt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ce),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ae),L.deleteBuffer(Ce),L.deleteSync(mt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,U=null,z=0){A.isTexture!==!0&&(Pr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,A=arguments[1]);let H=Math.pow(2,-z),N=Math.floor(A.image.width*H),ae=Math.floor(A.image.height*H),be=U!==null?U.x:0,Ae=U!==null?U.y:0;C.setTexture2D(A,0),L.copyTexSubImage2D(L.TEXTURE_2D,z,0,0,be,Ae,N,ae),le.unbindTexture()},this.copyTextureToTexture=function(A,U,z=null,H=null,N=0){A.isTexture!==!0&&(Pr("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,A=arguments[1],U=arguments[2],N=arguments[3]||0,z=null);let ae,be,Ae,Re,ze,We,Ce,it,mt,xt=A.isCompressedTexture?A.mipmaps[N]:A.image;z!==null?(ae=z.max.x-z.min.x,be=z.max.y-z.min.y,Ae=z.isBox3?z.max.z-z.min.z:1,Re=z.min.x,ze=z.min.y,We=z.isBox3?z.min.z:0):(ae=xt.width,be=xt.height,Ae=xt.depth||1,Re=0,ze=0,We=0),H!==null?(Ce=H.x,it=H.y,mt=H.z):(Ce=0,it=0,mt=0);let cn=Oe.convert(U.format),rt=Oe.convert(U.type),Le;U.isData3DTexture?(C.setTexture3D(U,0),Le=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(C.setTexture2DArray(U,0),Le=L.TEXTURE_2D_ARRAY):(C.setTexture2D(U,0),Le=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);let $n=L.getParameter(L.UNPACK_ROW_LENGTH),at=L.getParameter(L.UNPACK_IMAGE_HEIGHT),In=L.getParameter(L.UNPACK_SKIP_PIXELS),fs=L.getParameter(L.UNPACK_SKIP_ROWS),dn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,xt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,xt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Re),L.pixelStorei(L.UNPACK_SKIP_ROWS,ze),L.pixelStorei(L.UNPACK_SKIP_IMAGES,We);let xr=A.isDataArrayTexture||A.isData3DTexture,bt=U.isDataArrayTexture||U.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){let Vn=ge.get(A),br=ge.get(U),xn=ge.get(Vn.__renderTarget),Mi=ge.get(br.__renderTarget);le.bindFramebuffer(L.READ_FRAMEBUFFER,xn.__webglFramebuffer),le.bindFramebuffer(L.DRAW_FRAMEBUFFER,Mi.__webglFramebuffer);for(let Si=0;Si<Ae;Si++)xr&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ge.get(A).__webglTexture,N,We+Si),A.isDepthTexture?(bt&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ge.get(U).__webglTexture,N,mt+Si),L.blitFramebuffer(Re,ze,ae,be,Ce,it,ae,be,L.DEPTH_BUFFER_BIT,L.NEAREST)):bt?L.copyTexSubImage3D(Le,N,Ce,it,mt+Si,Re,ze,ae,be):L.copyTexSubImage2D(Le,N,Ce,it,mt+Si,Re,ze,ae,be);le.bindFramebuffer(L.READ_FRAMEBUFFER,null),le.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else bt?A.isDataTexture||A.isData3DTexture?L.texSubImage3D(Le,N,Ce,it,mt,ae,be,Ae,cn,rt,xt.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Le,N,Ce,it,mt,ae,be,Ae,cn,xt.data):L.texSubImage3D(Le,N,Ce,it,mt,ae,be,Ae,cn,rt,xt):A.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,N,Ce,it,ae,be,cn,rt,xt.data):A.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,N,Ce,it,xt.width,xt.height,cn,xt.data):L.texSubImage2D(L.TEXTURE_2D,N,Ce,it,ae,be,cn,rt,xt);L.pixelStorei(L.UNPACK_ROW_LENGTH,$n),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,at),L.pixelStorei(L.UNPACK_SKIP_PIXELS,In),L.pixelStorei(L.UNPACK_SKIP_ROWS,fs),L.pixelStorei(L.UNPACK_SKIP_IMAGES,dn),N===0&&U.generateMipmaps&&L.generateMipmap(Le),le.unbindTexture()},this.copyTextureToTexture3D=function(A,U,z=null,H=null,N=0){return A.isTexture!==!0&&(Pr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,H=arguments[1]||null,A=arguments[2],U=arguments[3],N=arguments[4]||0),Pr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,U,z,H,N)},this.initRenderTarget=function(A){ge.get(A).__webglFramebuffer===void 0&&C.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?C.setTextureCube(A,0):A.isData3DTexture?C.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?C.setTexture2DArray(A,0):C.setTexture2D(A,0),le.unbindTexture()},this.resetState=function(){w=0,T=0,I=null,le.reset(),nt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}};var fo=class r{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new fe(e),this.near=t,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Zs=class extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wt,this.environmentIntensity=1,this.environmentRotation=new Wt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Js=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Zc,this.updateRanges=[],this.version=0,this.uuid=Mn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},rn=new P,as=class r{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Nn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),i=ct(i,this.array),s=ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new r(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},qr=class extends $t{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Rs,Sr=new P,Cs=new P,Ps=new P,Is=new G,wr=new G,Kf=new Te,Ba=new P,Er=new P,za=new P,ef=new G,sc=new G,tf=new G,po=class extends gt{constructor(e=new qr){if(super(),this.isSprite=!0,this.type="Sprite",Rs===void 0){Rs=new pt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Js(t,5);Rs.setIndex([0,1,2,0,2,3]),Rs.setAttribute("position",new as(n,3,0,!1)),Rs.setAttribute("uv",new as(n,2,3,!1))}this.geometry=Rs,this.material=e,this.center=new G(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Cs.setFromMatrixScale(this.matrixWorld),Kf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ps.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Cs.multiplyScalar(-Ps.z);let n=this.material.rotation,i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));let a=this.center;Ha(Ba.set(-.5,-.5,0),Ps,a,Cs,i,s),Ha(Er.set(.5,-.5,0),Ps,a,Cs,i,s),Ha(za.set(.5,.5,0),Ps,a,Cs,i,s),ef.set(0,0),sc.set(1,0),tf.set(1,1);let o=e.ray.intersectTriangle(Ba,Er,za,!1,Sr);if(o===null&&(Ha(Er.set(-.5,.5,0),Ps,a,Cs,i,s),sc.set(0,1),o=e.ray.intersectTriangle(Ba,za,Er,!1,Sr),o===null))return;let l=e.ray.origin.distanceTo(Sr);l<e.near||l>e.far||t.push({distance:l,point:Sr.clone(),uv:Pi.getInterpolation(Sr,Ba,Er,za,ef,sc,tf,new G),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Ha(r,e,t,n,i,s){Is.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(wr.x=s*Is.x-i*Is.y,wr.y=i*Is.x+s*Is.y):wr.copy(Is),r.copy(e),r.x+=wr.x,r.y+=wr.y,r.applyMatrix4(Kf)}var nf=new P,sf=new tt,rf=new tt,Ov=new P,af=new Te,Va=new P,rc=new on,of=new Te,ac=new rs,mo=class extends Ne{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ad,this.bindMatrix=new Te,this.bindMatrixInverse=new Te,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new hn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Va),this.boundingBox.expandByPoint(Va)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new on),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Va),this.boundingSphere.expandByPoint(Va)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rc.copy(this.boundingSphere),rc.applyMatrix4(i),e.ray.intersectsSphere(rc)!==!1&&(of.copy(i).invert(),ac.copy(e.ray).applyMatrix4(of),!(this.boundingBox!==null&&ac.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ac)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new tt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ad?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===um?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;sf.fromBufferAttribute(i.attributes.skinIndex,e),rf.fromBufferAttribute(i.attributes.skinWeight,e),nf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=rf.getComponent(s);if(a!==0){let o=sf.getComponent(s);af.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Ov.copy(nf).applyMatrix4(af),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Xr=class extends gt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Sn=class extends St{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Rt,h=Rt,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},lf=new Te,Bv=new Te,go=class r{constructor(e=[],t=[]){this.uuid=Mn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Te)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Te;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:Bv;lf.multiplyMatrices(o,t[s]),lf.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Sn(t,e,e,Zt,kn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Xr),this.bones.push(a),this.boneInverses.push(new Te().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},di=class extends ut{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ls=new Te,cf=new Te,Ga=[],hf=new hn,zv=new Te,Tr=new Ne,Ar=new on,On=class extends Ne{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new di(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,zv)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new hn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ls),hf.copy(e.boundingBox).applyMatrix4(Ls),this.boundingBox.union(hf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new on),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ls),Ar.copy(e.boundingSphere).applyMatrix4(Ls),this.boundingSphere.union(Ar)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Tr.geometry=this.geometry,Tr.material=this.material,Tr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ar.copy(this.boundingSphere),Ar.applyMatrix4(n),e.ray.intersectsSphere(Ar)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ls),cf.multiplyMatrices(n,Ls),Tr.matrixWorld=cf,Tr.raycast(e,Ga);for(let a=0,o=Ga.length;a<o;a++){let l=Ga[a];l.instanceId=s,l.object=this,t.push(l)}Ga.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new di(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Sn(new Float32Array(i*this.count),i,this.count,Gh,kn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var jr=class extends $t{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},xo=new P,bo=new P,uf=new Te,Rr=new rs,Wa=new on,oc=new P,df=new P,Qs=class extends gt{constructor(e=new pt,t=new jr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)xo.fromBufferAttribute(t,i-1),bo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=xo.distanceTo(bo);e.setAttribute("lineDistance",new Ye(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wa.copy(n.boundingSphere),Wa.applyMatrix4(i),Wa.radius+=s,e.ray.intersectsSphere(Wa)===!1)return;uf.copy(i).invert(),Rr.copy(e.ray).applyMatrix4(uf);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let b=f,g=m-1;b<g;b+=c){let p=h.getX(b),_=h.getX(b+1),v=qa(this,e,Rr,l,p,_);v&&t.push(v)}if(this.isLineLoop){let b=h.getX(m-1),g=h.getX(f),p=qa(this,e,Rr,l,b,g);p&&t.push(p)}}else{let f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let b=f,g=m-1;b<g;b+=c){let p=qa(this,e,Rr,l,b,b+1);p&&t.push(p)}if(this.isLineLoop){let b=qa(this,e,Rr,l,m-1,f);b&&t.push(b)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function qa(r,e,t,n,i,s){let a=r.geometry.attributes.position;if(xo.fromBufferAttribute(a,i),bo.fromBufferAttribute(a,s),t.distanceSqToSegment(xo,bo,oc,df)>n)return;oc.applyMatrix4(r.matrixWorld);let l=e.ray.origin.distanceTo(oc);if(!(l<e.near||l>e.far))return{distance:l,point:df.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}var ff=new P,pf=new P,vo=class extends Qs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)ff.fromBufferAttribute(t,i),pf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ff.distanceTo(pf);e.setAttribute("lineDistance",new Ye(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},_o=class extends Qs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Yr=class extends $t{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},mf=new Te,uh=new rs,Xa=new on,ja=new P,$s=class extends gt{constructor(e=new pt,t=new Yr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xa.copy(n.boundingSphere),Xa.applyMatrix4(i),Xa.radius+=s,e.ray.intersectsSphere(Xa)===!1)return;mf.copy(i).invert(),uh.copy(e.ray).applyMatrix4(mf);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,b=f;m<b;m++){let g=c.getX(m);ja.fromBufferAttribute(u,g),gf(ja,g,l,i,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let m=d,b=f;m<b;m++)ja.fromBufferAttribute(u,m),gf(ja,m,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function gf(r,e,t,n,i,s,a){let o=uh.distanceSqToPoint(r);if(o<t){let l=new P;uh.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var yo=class extends St{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isVideoTexture=!0,this.minFilter=a!==void 0?a:Vt,this.magFilter=s!==void 0?s:Vt,this.generateMipmaps=!1;let h=this;function u(){h.needsUpdate=!0,e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){let e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}};var en=class extends St{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},wn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);let h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new G:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new P,i=[],s=[],a=[],o=new P,l=new Te;for(let f=0;f<=e;f++){let m=f/e;i[f]=this.getTangentAt(m,new P)}s[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Ut(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(Ut(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Kr=class extends wn{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new G){let n=t,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},dh=class extends Kr{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Zh(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){let a=s*s,o=a*s;return r+e*s+t*a+n*o}}}var Ya=new P,lc=new Zh,cc=new Zh,hc=new Zh,Zr=class extends wn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new P){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%s]:(Ya.subVectors(i[0],i[1]).add(i[0]),c=Ya);let u=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(Ya.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Ya),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),f),b=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);b<1e-4&&(b=1),m<1e-4&&(m=b),g<1e-4&&(g=b),lc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,b,g),cc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,b,g),hc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,b,g)}else this.curveType==="catmullrom"&&(lc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),cc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),hc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(lc.calc(l),cc.calc(l),hc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new P().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function xf(r,e,t,n,i){let s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function Hv(r,e){let t=1-r;return t*t*e}function Vv(r,e){return 2*(1-r)*r*e}function Gv(r,e){return r*r*e}function kr(r,e,t,n){return Hv(r,e)+Vv(r,t)+Gv(r,n)}function Wv(r,e){let t=1-r;return t*t*t*e}function qv(r,e){let t=1-r;return 3*t*t*r*e}function Xv(r,e){return 3*(1-r)*r*r*e}function jv(r,e){return r*r*r*e}function Fr(r,e,t,n,i){return Wv(r,e)+qv(r,t)+Xv(r,n)+jv(r,i)}var Mo=class extends wn{constructor(e=new G,t=new G,n=new G,i=new G){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new G){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Fr(e,i.x,s.x,a.x,o.x),Fr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},fh=class extends wn{constructor(e=new P,t=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new P){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Fr(e,i.x,s.x,a.x,o.x),Fr(e,i.y,s.y,a.y,o.y),Fr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},So=class extends wn{constructor(e=new G,t=new G){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new G){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ph=class extends wn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wo=class extends wn{constructor(e=new G,t=new G,n=new G){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new G){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(kr(e,i.x,s.x,a.x),kr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Eo=class extends wn{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(kr(e,i.x,s.x,a.x),kr(e,i.y,s.y,a.y),kr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},To=class extends wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new G){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(xf(o,l.x,c.x,h.x,u.x),xf(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new G().fromArray(i))}return this}},Ao=Object.freeze({__proto__:null,ArcCurve:dh,CatmullRomCurve3:Zr,CubicBezierCurve:Mo,CubicBezierCurve3:fh,EllipseCurve:Kr,LineCurve:So,LineCurve3:ph,QuadraticBezierCurve:wo,QuadraticBezierCurve3:Eo,SplineCurve:To}),mh=class extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ao[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Ao[i.type]().fromJSON(i))}return this}},Ro=class extends mh{constructor(e){super(),this.type="Path",this.currentPoint=new G,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new So(this.currentPoint.clone(),new G(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new wo(this.currentPoint.clone(),new G(e,t),new G(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new Mo(this.currentPoint.clone(),new G(e,t),new G(n,i),new G(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new To(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){let c=new Kr(e,t,n,i,s,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},er=class r extends pt{constructor(e=[new G(0,-.5),new G(.5,0),new G(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Ut(i,0,Math.PI*2);let s=[],a=[],o=[],l=[],c=[],h=1/t,u=new P,d=new G,f=new P,m=new P,b=new P,g=0,p=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:g=e[_+1].x-e[_].x,p=e[_+1].y-e[_].y,f.x=p*1,f.y=-g,f.z=p*0,b.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(b.x,b.y,b.z);break;default:g=e[_+1].x-e[_].x,p=e[_+1].y-e[_].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=b.x,f.y+=b.y,f.z+=b.z,f.normalize(),l.push(f.x,f.y,f.z),b.copy(m)}for(let _=0;_<=t;_++){let v=n+_*h*i,x=Math.sin(v),E=Math.cos(v);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*x,u.y=e[w].y,u.z=e[w].x*E,a.push(u.x,u.y,u.z),d.x=_/t,d.y=w/(e.length-1),o.push(d.x,d.y);let T=l[3*w+0]*x,I=l[3*w+1],S=l[3*w+0]*E;c.push(T,I,S)}}for(let _=0;_<t;_++)for(let v=0;v<e.length-1;v++){let x=v+_*e.length,E=x,w=x+e.length,T=x+e.length+1,I=x+1;s.push(E,w,I),s.push(T,I,w)}this.setIndex(s),this.setAttribute("position",new Ye(a,3)),this.setAttribute("uv",new Ye(o,2)),this.setAttribute("normal",new Ye(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}};var Co=class r extends pt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new P,h=new G;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ye(a,3)),this.setAttribute("normal",new Ye(o,3)),this.setAttribute("uv",new Ye(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Lt=class r extends pt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],f=[],m=0,b=[],g=n/2,p=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Ye(u,3)),this.setAttribute("normal",new Ye(d,3)),this.setAttribute("uv",new Ye(f,2));function _(){let x=new P,E=new P,w=0,T=(t-e)/n;for(let I=0;I<=s;I++){let S=[],y=I/s,R=y*(t-e)+e;for(let F=0;F<=i;F++){let k=F/i,O=k*l+o,K=Math.sin(O),V=Math.cos(O);E.x=R*K,E.y=-y*n+g,E.z=R*V,u.push(E.x,E.y,E.z),x.set(K,T,V).normalize(),d.push(x.x,x.y,x.z),f.push(k,1-y),S.push(m++)}b.push(S)}for(let I=0;I<i;I++)for(let S=0;S<s;S++){let y=b[S][I],R=b[S+1][I],F=b[S+1][I+1],k=b[S][I+1];(e>0||S!==0)&&(h.push(y,R,k),w+=3),(t>0||S!==s-1)&&(h.push(R,F,k),w+=3)}c.addGroup(p,w,0),p+=w}function v(x){let E=m,w=new G,T=new P,I=0,S=x===!0?e:t,y=x===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,g*y,0),d.push(0,y,0),f.push(.5,.5),m++;let R=m;for(let F=0;F<=i;F++){let O=F/i*l+o,K=Math.cos(O),V=Math.sin(O);T.x=S*V,T.y=g*y,T.z=S*K,u.push(T.x,T.y,T.z),d.push(0,y,0),w.x=K*.5+.5,w.y=V*.5*y+.5,f.push(w.x,w.y),m++}for(let F=0;F<i;F++){let k=E+F,O=R+F;x===!0?h.push(O,O+1,k):h.push(O+1,O,k),I+=3}c.addGroup(p,I,x===!0?1:2),p+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Jr=class extends Ro{constructor(e){super(e),this.uuid=Mn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Ro().fromJSON(i))}return this}},Yv={triangulate:function(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Zf(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c,h,u,d,f;if(n&&(s=$v(r,e,s,t)),r.length>80*t){o=c=r[0],l=h=r[1];for(let m=t;m<i;m+=t)u=r[m],d=r[m+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return Qr(s,a,t,o,l,f,0),a}};function Zf(r,e,t,n,i){let s,a;if(i===h_(r,e,t,n)>0)for(s=e;s<t;s+=n)a=bf(s,r[s],r[s+1],a);else for(s=t-n;s>=e;s-=n)a=bf(s,r[s],r[s+1],a);return a&&Jo(a,a.next)&&(ea(a),a=a.next),a}function os(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(Jo(t,t.next)||yt(t.prev,t,t.next)===0)){if(ea(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Qr(r,e,t,n,i,s,a){if(!r)return;!a&&s&&s_(r,n,i,s);let o=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?Zv(r,n,i,s):Kv(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(c.i/t|0),ea(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=Jv(os(r),e,t),Qr(r,e,t,n,i,s,2)):a===2&&Qv(r,e,t,n,i,s):Qr(os(r),e,t,n,i,s,1);break}}}function Kv(r){let e=r.prev,t=r,n=r.next;if(yt(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=i<s?i<a?i:a:s<a?s:a,u=o<l?o<c?o:c:l<c?l:c,d=i>s?i>a?i:a:s>a?s:a,f=o>l?o>c?o:c:l>c?l:c,m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Fs(i,o,s,l,a,c,m.x,m.y)&&yt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Zv(r,e,t,n){let i=r.prev,s=r,a=r.next;if(yt(i,s,a)>=0)return!1;let o=i.x,l=s.x,c=a.x,h=i.y,u=s.y,d=a.y,f=o<l?o<c?o:c:l<c?l:c,m=h<u?h<d?h:d:u<d?u:d,b=o>l?o>c?o:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,p=gh(f,m,e,t,n),_=gh(b,g,e,t,n),v=r.prevZ,x=r.nextZ;for(;v&&v.z>=p&&x&&x.z<=_;){if(v.x>=f&&v.x<=b&&v.y>=m&&v.y<=g&&v!==i&&v!==a&&Fs(o,h,l,u,c,d,v.x,v.y)&&yt(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=f&&x.x<=b&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&Fs(o,h,l,u,c,d,x.x,x.y)&&yt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=b&&v.y>=m&&v.y<=g&&v!==i&&v!==a&&Fs(o,h,l,u,c,d,v.x,v.y)&&yt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=_;){if(x.x>=f&&x.x<=b&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&Fs(o,h,l,u,c,d,x.x,x.y)&&yt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Jv(r,e,t){let n=r;do{let i=n.prev,s=n.next.next;!Jo(i,s)&&Jf(i,n,n.next,s)&&$r(i,s)&&$r(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),ea(n),ea(n.next),n=r=s),n=n.next}while(n!==r);return os(n)}function Qv(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&o_(a,o)){let l=Qf(a,o);a=os(a,a.next),l=os(l,l.next),Qr(a,e,t,n,i,s,0),Qr(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function $v(r,e,t,n){let i=[],s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=Zf(r,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(a_(c));for(i.sort(e_),s=0;s<i.length;s++)t=t_(i[s],t);return t}function e_(r,e){return r.x-e.x}function t_(r,e){let t=n_(r,e);if(!t)return e;let n=Qf(t,r);return os(n,n.next),os(t,t.next)}function n_(r,e){let t=e,n=-1/0,i,s=r.x,a=r.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){let d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===s))return i}t=t.next}while(t!==e);if(!i)return null;let o=i,l=i.x,c=i.y,h=1/0,u;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&Fs(a<c?s:n,a,l,c,a<c?n:s,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(s-t.x),$r(t,r)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&i_(i,t)))&&(i=t,h=u)),t=t.next;while(t!==o);return i}function i_(r,e){return yt(r.prev,r,e.prev)<0&&yt(e.next,r,r.next)<0}function s_(r,e,t,n){let i=r;do i.z===0&&(i.z=gh(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,r_(i)}function r_(r){let e,t,n,i,s,a,o,l,c=1;do{for(t=r,r=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(a>1);return r}function gh(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function a_(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Fs(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function o_(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!l_(r,e)&&($r(r,e)&&$r(e,r)&&c_(r,e)&&(yt(r.prev,r,e.prev)||yt(r,e.prev,e))||Jo(r,e)&&yt(r.prev,r,r.next)>0&&yt(e.prev,e,e.next)>0)}function yt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Jo(r,e){return r.x===e.x&&r.y===e.y}function Jf(r,e,t,n){let i=Za(yt(r,e,t)),s=Za(yt(r,e,n)),a=Za(yt(t,n,r)),o=Za(yt(t,n,e));return!!(i!==s&&a!==o||i===0&&Ka(r,t,e)||s===0&&Ka(r,n,e)||a===0&&Ka(t,r,n)||o===0&&Ka(t,e,n))}function Ka(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Za(r){return r>0?1:r<0?-1:0}function l_(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Jf(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function $r(r,e){return yt(r.prev,r,r.next)<0?yt(r,e,r.next)>=0&&yt(r,r.prev,e)>=0:yt(r,e,r.prev)<0||yt(r,r.next,e)<0}function c_(r,e){let t=r,n=!1,i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Qf(r,e){let t=new xh(r.i,r.x,r.y),n=new xh(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function bf(r,e,t,n){let i=new xh(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ea(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function xh(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function h_(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}var Or=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];vf(e),_f(n,e);let a=e.length;t.forEach(vf);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,_f(n,t[l]);let o=Yv.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function vf(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function _f(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Po=class r extends pt{constructor(e=new Jr([new G(.5,.5),new G(-.5,.5),new G(-.5,-.5),new G(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new Ye(i,3)),this.setAttribute("uv",new Ye(s,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,b=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:u_,v,x=!1,E,w,T,I;p&&(v=p.getSpacedPoints(h),x=!0,d=!1,E=p.computeFrenetFrames(h,!1),w=new P,T=new P,I=new P),d||(g=0,f=0,m=0,b=0);let S=o.extractPoints(c),y=S.shape,R=S.holes;if(!Or.isClockWise(y)){y=y.reverse();for(let Z=0,re=R.length;Z<re;Z++){let L=R[Z];Or.isClockWise(L)&&(R[Z]=L.reverse())}}let k=Or.triangulateShape(y,R),O=y;for(let Z=0,re=R.length;Z<re;Z++){let L=R[Z];y=y.concat(L)}function K(Z,re,L){return re||console.error("THREE.ExtrudeGeometry: vec does not exist"),Z.clone().addScaledVector(re,L)}let V=y.length,$=k.length;function W(Z,re,L){let Ee,ne,ve,le=Z.x-re.x,Ue=Z.y-re.y,ge=L.x-Z.x,C=L.y-Z.y,M=le*le+Ue*Ue,B=le*C-Ue*ge;if(Math.abs(B)>Number.EPSILON){let j=Math.sqrt(M),Q=Math.sqrt(ge*ge+C*C),Y=re.x-Ue/j,we=re.y+le/j,he=L.x-C/Q,me=L.y+ge/Q,Ve=((he-Y)*C-(me-we)*ge)/(le*C-Ue*ge);Ee=Y+le*Ve-Z.x,ne=we+Ue*Ve-Z.y;let ie=Ee*Ee+ne*ne;if(ie<=2)return new G(Ee,ne);ve=Math.sqrt(ie/2)}else{let j=!1;le>Number.EPSILON?ge>Number.EPSILON&&(j=!0):le<-Number.EPSILON?ge<-Number.EPSILON&&(j=!0):Math.sign(Ue)===Math.sign(C)&&(j=!0),j?(Ee=-Ue,ne=le,ve=Math.sqrt(M)):(Ee=le,ne=Ue,ve=Math.sqrt(M/2))}return new G(Ee/ve,ne/ve)}let ee=[];for(let Z=0,re=O.length,L=re-1,Ee=Z+1;Z<re;Z++,L++,Ee++)L===re&&(L=0),Ee===re&&(Ee=0),ee[Z]=W(O[Z],O[L],O[Ee]);let oe=[],pe,De=ee.concat();for(let Z=0,re=R.length;Z<re;Z++){let L=R[Z];pe=[];for(let Ee=0,ne=L.length,ve=ne-1,le=Ee+1;Ee<ne;Ee++,ve++,le++)ve===ne&&(ve=0),le===ne&&(le=0),pe[Ee]=W(L[Ee],L[ve],L[le]);oe.push(pe),De=De.concat(pe)}for(let Z=0;Z<g;Z++){let re=Z/g,L=f*Math.cos(re*Math.PI/2),Ee=m*Math.sin(re*Math.PI/2)+b;for(let ne=0,ve=O.length;ne<ve;ne++){let le=K(O[ne],ee[ne],Ee);se(le.x,le.y,-L)}for(let ne=0,ve=R.length;ne<ve;ne++){let le=R[ne];pe=oe[ne];for(let Ue=0,ge=le.length;Ue<ge;Ue++){let C=K(le[Ue],pe[Ue],Ee);se(C.x,C.y,-L)}}}let Xe=m+b;for(let Z=0;Z<V;Z++){let re=d?K(y[Z],De[Z],Xe):y[Z];x?(T.copy(E.normals[0]).multiplyScalar(re.x),w.copy(E.binormals[0]).multiplyScalar(re.y),I.copy(v[0]).add(T).add(w),se(I.x,I.y,I.z)):se(re.x,re.y,0)}for(let Z=1;Z<=h;Z++)for(let re=0;re<V;re++){let L=d?K(y[re],De[re],Xe):y[re];x?(T.copy(E.normals[Z]).multiplyScalar(L.x),w.copy(E.binormals[Z]).multiplyScalar(L.y),I.copy(v[Z]).add(T).add(w),se(I.x,I.y,I.z)):se(L.x,L.y,u/h*Z)}for(let Z=g-1;Z>=0;Z--){let re=Z/g,L=f*Math.cos(re*Math.PI/2),Ee=m*Math.sin(re*Math.PI/2)+b;for(let ne=0,ve=O.length;ne<ve;ne++){let le=K(O[ne],ee[ne],Ee);se(le.x,le.y,u+L)}for(let ne=0,ve=R.length;ne<ve;ne++){let le=R[ne];pe=oe[ne];for(let Ue=0,ge=le.length;Ue<ge;Ue++){let C=K(le[Ue],pe[Ue],Ee);x?se(C.x,C.y+v[h-1].y,v[h-1].x+L):se(C.x,C.y,u+L)}}}X(),te();function X(){let Z=i.length/3;if(d){let re=0,L=V*re;for(let Ee=0;Ee<$;Ee++){let ne=k[Ee];Se(ne[2]+L,ne[1]+L,ne[0]+L)}re=h+g*2,L=V*re;for(let Ee=0;Ee<$;Ee++){let ne=k[Ee];Se(ne[0]+L,ne[1]+L,ne[2]+L)}}else{for(let re=0;re<$;re++){let L=k[re];Se(L[2],L[1],L[0])}for(let re=0;re<$;re++){let L=k[re];Se(L[0]+V*h,L[1]+V*h,L[2]+V*h)}}n.addGroup(Z,i.length/3-Z,0)}function te(){let Z=i.length/3,re=0;de(O,re),re+=O.length;for(let L=0,Ee=R.length;L<Ee;L++){let ne=R[L];de(ne,re),re+=ne.length}n.addGroup(Z,i.length/3-Z,1)}function de(Z,re){let L=Z.length;for(;--L>=0;){let Ee=L,ne=L-1;ne<0&&(ne=Z.length-1);for(let ve=0,le=h+g*2;ve<le;ve++){let Ue=V*ve,ge=V*(ve+1),C=re+Ee+Ue,M=re+ne+Ue,B=re+ne+ge,j=re+Ee+ge;Pe(C,M,B,j)}}}function se(Z,re,L){l.push(Z),l.push(re),l.push(L)}function Se(Z,re,L){Ie(Z),Ie(re),Ie(L);let Ee=i.length/3,ne=_.generateTopUV(n,i,Ee-3,Ee-2,Ee-1);Qe(ne[0]),Qe(ne[1]),Qe(ne[2])}function Pe(Z,re,L,Ee){Ie(Z),Ie(re),Ie(Ee),Ie(re),Ie(L),Ie(Ee);let ne=i.length/3,ve=_.generateSideWallUV(n,i,ne-6,ne-3,ne-2,ne-1);Qe(ve[0]),Qe(ve[1]),Qe(ve[3]),Qe(ve[1]),Qe(ve[2]),Qe(ve[3])}function Ie(Z){i.push(l[Z*3+0]),i.push(l[Z*3+1]),i.push(l[Z*3+2])}function Qe(Z){s.push(Z.x),s.push(Z.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return d_(t,n,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Ao[i.type]().fromJSON(i)),new r(n,e.options)}},u_={generateTopUV:function(r,e,t,n,i){let s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new G(s,a),new G(o,l),new G(c,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],m=e[i*3+2],b=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new G(a,1-l),new G(c,1-u),new G(d,1-m),new G(b,1-p)]:[new G(o,1-l),new G(h,1-u),new G(f,1-m),new G(g,1-p)]}};function d_(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){let s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var tr=class r extends pt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new P,d=new P,f=[],m=[],b=[],g=[];for(let p=0;p<=n;p++){let _=[],v=p/n,x=0;p===0&&a===0?x=.5/t:p===n&&l===Math.PI&&(x=-.5/t);for(let E=0;E<=t;E++){let w=E/t;u.x=-e*Math.cos(i+w*s)*Math.sin(a+v*o),u.y=e*Math.cos(a+v*o),u.z=e*Math.sin(i+w*s)*Math.sin(a+v*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),b.push(d.x,d.y,d.z),g.push(w+x,1-v),_.push(c++)}h.push(_)}for(let p=0;p<n;p++)for(let _=0;_<t;_++){let v=h[p][_+1],x=h[p][_],E=h[p+1][_],w=h[p+1][_+1];(p!==0||a>0)&&f.push(v,x,w),(p!==n-1||l<Math.PI)&&f.push(x,E,w)}this.setIndex(f),this.setAttribute("position",new Ye(m,3)),this.setAttribute("normal",new Ye(b,3)),this.setAttribute("uv",new Ye(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Io=class r extends pt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new P,u=new P,d=new P;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){let b=m/i*s,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(b),u.y=(e+t*Math.cos(g))*Math.sin(b),u.z=t*Math.sin(g),o.push(u.x,u.y,u.z),h.x=e*Math.cos(b),h.y=e*Math.sin(b),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){let b=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,_=(i+1)*f+m;a.push(b,g,_),a.push(g,p,_)}this.setIndex(a),this.setAttribute("position",new Ye(o,3)),this.setAttribute("normal",new Ye(l,3)),this.setAttribute("uv",new Ye(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Lo=class r extends pt{constructor(e=new Eo(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,l=new P,c=new G,h=new P,u=[],d=[],f=[],m=[];b(),this.setIndex(m),this.setAttribute("position",new Ye(u,3)),this.setAttribute("normal",new Ye(d,3)),this.setAttribute("uv",new Ye(f,2));function b(){for(let v=0;v<t;v++)g(v);g(s===!1?t:0),_(),p()}function g(v){h=e.getPointAt(v/t,h);let x=a.normals[v],E=a.binormals[v];for(let w=0;w<=i;w++){let T=w/i*Math.PI*2,I=Math.sin(T),S=-Math.cos(T);l.x=S*x.x+I*E.x,l.y=S*x.y+I*E.y,l.z=S*x.z+I*E.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let v=1;v<=t;v++)for(let x=1;x<=i;x++){let E=(i+1)*(v-1)+(x-1),w=(i+1)*v+(x-1),T=(i+1)*v+x,I=(i+1)*(v-1)+x;m.push(E,w,I),m.push(w,T,I)}}function _(){for(let v=0;v<=t;v++)for(let x=0;x<=i;x++)c.x=v/t,c.y=x/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new Ao[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var Do=class extends st{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}},vt=class extends $t{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yo,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},mn=class extends vt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new G(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Uo=class extends $t{static get type(){return"MeshNormalMaterial"}constructor(e){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yo,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},ls=class extends $t{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yo,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=Dh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Ja(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function f_(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function p_(r){function e(i,s){return r[i]-r[s]}let t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function yf(r,e,t){let n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function $f(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}var Fi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},bh=class extends Fi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Us,endingEnd:Us}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ns:s=e,o=2*t-n;break;case io:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ns:a=e,l=2*n-t;break;case io:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),b=m*m,g=b*m,p=-d*g+2*d*b-d*m,_=(1+d)*g+(-1.5-2*d)*b+(-.5+d)*m+1,v=(-1-f)*g+(1.5+f)*b+.5*m,x=f*g-f*b;for(let E=0;E!==o;++E)s[E]=p*a[h+E]+_*a[c+E]+v*a[l+E]+x*a[u+E];return s}},No=class extends Fi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}},vh=class extends Fi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},En=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ja(t,this.TimeBufferType),this.values=Ja(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ja(e.times,Array),values:Ja(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new vh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new bh(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case qs:t=this.InterpolantFactoryMethodDiscrete;break;case Xs:t=this.InterpolantFactoryMethodLinear;break;case Il:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qs;case this.InterpolantFactoryMethodLinear:return Xs;case this.InterpolantFactoryMethodSmooth:return Il}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&f_(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Il,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let b=t[u+m];if(b!==t[d+m]||b!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};En.prototype.TimeBufferType=Float32Array;En.prototype.ValueBufferType=Float32Array;En.prototype.DefaultInterpolation=Xs;var Oi=class extends En{constructor(e,t,n){super(e,t,n)}};Oi.prototype.ValueTypeName="bool";Oi.prototype.ValueBufferType=Array;Oi.prototype.DefaultInterpolation=qs;Oi.prototype.InterpolantFactoryMethodLinear=void 0;Oi.prototype.InterpolantFactoryMethodSmooth=void 0;var ko=class extends En{};ko.prototype.ValueTypeName="color";var fi=class extends En{};fi.prototype.ValueTypeName="number";var _h=class extends Fi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)Ft.slerpFlat(s,0,a,c-o,a,c,l);return s}},pi=class extends En{InterpolantFactoryMethodLinear(e){return new _h(this.times,this.values,this.getValueSize(),e)}};pi.prototype.ValueTypeName="quaternion";pi.prototype.InterpolantFactoryMethodSmooth=void 0;var Bi=class extends En{constructor(e,t,n){super(e,t,n)}};Bi.prototype.ValueTypeName="string";Bi.prototype.ValueBufferType=Array;Bi.prototype.DefaultInterpolation=qs;Bi.prototype.InterpolantFactoryMethodLinear=void 0;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var mi=class extends En{};mi.prototype.ValueTypeName="vector";var nr=class{constructor(e="",t=-1,n=[],i=jh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Mn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(g_(n[a]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(En.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let h=p_(l);l=yf(l,1,h),c=yf(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new fi(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(s);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,m,b){if(f.length!==0){let g=[],p=[];$f(f,g,p,m),g.length!==0&&b.push(new u(d,g,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let b=0;b<d[m].morphTargets.length;b++)f[d[m].morphTargets[b]]=-1;for(let b in f){let g=[],p=[];for(let _=0;_!==d[m].morphTargets.length;++_){let v=d[m];g.push(v.time),p.push(v.morphTarget===b?1:0)}i.push(new fi(".morphTargetInfluence["+b+"]",g,p))}l=f.length*a}else{let f=".bones["+t[u].name+"]";n(mi,f+".position",d,"pos",i),n(pi,f+".quaternion",d,"rot",i),n(mi,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function m_(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return fi;case"vector":case"vector2":case"vector3":case"vector4":return mi;case"color":return ko;case"quaternion":return pi;case"bool":case"boolean":return Oi;case"string":return Bi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function g_(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=m_(r.type);if(r.times===void 0){let t=[],n=[];$f(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}var Ii={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},yh=class{constructor(e,t,n){let i=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}},x_=new yh,gi=class{constructor(e){this.manager=e!==void 0?e:x_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};gi.DEFAULT_MATERIAL_NAME="__DEFAULT";var ri={},Mh=class extends Error{constructor(e,t){super(e),this.response=t}},ta=class extends gi{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=Ii.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(ri[e]!==void 0){ri[e].push({onLoad:t,onProgress:n,onError:i});return}ri[e]=[],ri[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||c.body===void 0||c.body.getReader===void 0)return c;let h=ri[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0,b=0,g=new ReadableStream({start(p){_();function _(){u.read().then(({done:v,value:x})=>{if(v)p.close();else{b+=x.byteLength;let E=new ProgressEvent("progress",{lengthComputable:m,loaded:b,total:f});for(let w=0,T=h.length;w<T;w++){let I=h[w];I.onProgress&&I.onProgress(E)}p.enqueue(x),_()}},v=>{p.error(v)})}}});return new Response(g)}else throw new Mh(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{Ii.add(e,c);let h=ri[e];delete ri[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=ri[e];if(h===void 0)throw this.manager.itemError(e),c;delete ri[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Sh=class extends gi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Ii.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;let o=Hr("img");function l(){h(),Ii.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}};var Xn=class extends gi{constructor(e){super(e)}load(e,t,n,i){let s=new St,a=new Sh(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},cs=class extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Fo=class extends cs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},uc=new Te,Mf=new P,Sf=new P,na=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new G(512,512),this.map=null,this.mapPass=null,this.matrix=new Te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ui,this._frameExtents=new G(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Mf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mf),Sf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sf),t.updateMatrixWorld(),uc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(uc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},wh=class extends na{constructor(){super(new Nt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=js*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},ir=class extends cs{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new wh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},wf=new Te,Cr=new P,dc=new P,Eh=class extends na{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new G(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Cr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Cr),dc.copy(n.position),dc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(dc),n.updateMatrixWorld(),i.makeTranslation(-Cr.x,-Cr.y,-Cr.z),wf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wf)}},xi=class extends cs{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Eh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Th=class extends na{constructor(){super(new Ni(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Oo=class extends cs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new Th}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var sr=class extends cs{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){let t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}};var zi=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Bo=class extends gi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Ii.get(e);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ii.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Ii.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Ii.add(e,l),s.manager.itemStart(e)}};var zo=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ef(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Ef();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Ef(){return performance.now()}var Ah=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,s=e*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){Ft.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){let a=this._workIndex*s;Ft.multiplyQuaternionsFlat(e,a,e,t,e,n),Ft.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){let a=1-i;for(let o=0;o!==s;++o){let l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){let o=t+a;e[o]=e[o]+e[n+a]*i}}},Jh="\\[\\]\\.:\\/",b_=new RegExp("["+Jh+"]","g"),Qh="[^"+Jh+"]",v_="[^"+Jh.replace("\\.","")+"]",__=/((?:WC+[\/:])*)/.source.replace("WC",Qh),y_=/(WCOD+)?/.source.replace("WCOD",v_),M_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Qh),S_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Qh),w_=new RegExp("^"+__+y_+M_+S_+"$"),E_=["material","materials","bones","map"],Rh=class{constructor(e,t,n){let i=n||ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ft=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(b_,"")}static parseTrackName(e){let t=w_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);E_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ft.Composite=Rh;ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ft.prototype.GetterByBindingType=[ft.prototype._getValue_direct,ft.prototype._getValue_array,ft.prototype._getValue_arrayElement,ft.prototype._getValue_toArray];ft.prototype.SetterByBindingTypeAndVersioning=[[ft.prototype._setValue_direct,ft.prototype._setValue_direct_setNeedsUpdate,ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_array,ft.prototype._setValue_array_setNeedsUpdate,ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_arrayElement,ft.prototype._setValue_arrayElement_setNeedsUpdate,ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_fromArray,ft.prototype._setValue_fromArray_setNeedsUpdate,ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ch=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let s=t.tracks,a=s.length,o=new Array(a),l={endingStart:Us,endingEnd:Us};for(let c=0;c!==a;++c){let h=s[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=fm,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,s=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let s=this._startTime;if(s!==null){let l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case mm:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case jh:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,s=this._loopCount,a=n===pm;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===dm){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){let o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);let l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=Ns,i.endingEnd=Ns):(e?i.endingStart=this.zeroSlopeAtStart?Ns:Us:i.endingStart=io,t?i.endingEnd=this.zeroSlopeAtEnd?Ns:Us:i.endingEnd=io)}_scheduleFading(e,t,n){let i=this._mixer,s=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}},T_=new Float32Array(1),Ho=class extends hi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){let d=i[u],f=d.name,m=h[f];if(m!==void 0)++m.referenceCount,a[u]=m;else{if(m=a[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}let b=t&&t._propertyBindings[u].binding.parsedPath;m=new Ah(ft.create(n,f,b),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),a[u]=m}o[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,s=this._actionsByClip,a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,s=this._bindings,a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new No(new Float32Array(2),new Float32Array(2),1,T_),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){let i=t||this._root,s=i.uuid,a=typeof e=="string"?nr.findByName(i,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=jh),l!==void 0){let u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let h=new Ch(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(e,t){let n=t||this._root,i=n.uuid,s=typeof e=="string"?nr.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){let a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(let a in s){let o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var Tf=new Te,Vo=class{constructor(e,t,n=0,i=1/0){this.ray=new rs(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Vr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Tf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Tf),this}intersectObject(e,t=!0,n=[]){return Ph(e,this,n,t),n.sort(Af),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Ph(e[i],this,n,t);return n.sort(Af),n}};function Af(r,e){return r.distance-e.distance}function Ph(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let a=0,o=s.length;a<o;a++)Ph(s[a],e,t,!0)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var _t=14.700000000000001,Tt=3.6,Gt=3.8,Dt=3.2,An=3.5,He=.3,ep=3.2,tp=_t+1.6,Tn=.45,A_=22,R_=1.25,ip=1.1;function qt(r,e){return r.cx+e*(.3/2+7.2/2)}function np(r,e){let t=r&&e?r/e:1,n=t>=1?Math.min(2.3,1.45*t):1.45*t,i=n/t;return i>1.55&&(i=1.55,n=i*t),[n,i]}function C_(r,e){let t=[];return e.forEach(n=>{let i=r[n],s=i&&i.works||[];if(!s.length)return;let a=[];for(let o=0;o<Math.ceil(s.length/2);o++){let l=s[2*o],c=s[2*o+1],h=np(l.w,l.h),u=c?np(c.w,c.h):[0,0];a.push({P:l,Q:c,sp:h,sq:u,wi:2*o,len:Math.max(h[0],u[0])+R_})}t.push({gi:n,slots:a,len:a.reduce((o,l)=>o+l.len,0)})}),t}var $h=r=>r.reduce((e,t,n)=>e+t.len+(n?ip:0),0);function sp(r,e){let t=Math.max(1,e.length),n=Math.max(18,t*tp+4),i={x0:-n/2,x1:n/2,z0:-16/2,z1:16/2,h:6},s=[],a=e.map((l,c)=>{let h=(c-(t-1)/2)*tp,u={i:c,title:l.title,count:l.list.length,cx:h,zStart:i.z0},d=C_(r,l.list),f=d.reduce((y,R)=>y+R.len,0),m=0,b=d.length;for(let y=0;y<d.length;y++){if(m+d[y].len/2>f/2){b=y;break}m+=d[y].len}d.length>1&&(b=Math.max(1,Math.min(d.length-1,b)));let g=d.slice(0,b),p=d.slice(b),_=[],v=[];g.forEach(y=>{v.length&&$h(v.concat([y]))>A_&&(_.push(v),v=[]),v.push(y)}),(v.length||!_.length)&&_.push(v);let x=_.length,E=Array.from({length:x},()=>[]),w=p.reduce((y,R)=>y+R.len,0)||1,T=x-1,I=0;p.forEach((y,R)=>{let F=p.length-R;E[T].length&&T>0&&(I+y.len/2>w*(x-T)/x||F<=T)&&T--,E[T].push(y),I+=y.len}),u.works=[],u.bays=[],u.rooms=[];let S=i.z0-He/2;for(let y=0;y<x;y++){let R=$h(_[y]),F=$h(E[y]),k=Math.max(R,F,6),O={sec:c,idx:y,z0:S,bays:[],works:[]};O.spine0=S-ep,O.spine1=O.spine0-k-.8,O.z1=O.spine1-ep,s.push({x0:h-.3/2-Tn,x1:h+.3/2+Tn,z0:O.spine1-Tn,z1:O.spine0+Tn});let K=(V,$,W)=>{let ee=$<0?-1:1,oe=$<0?O.spine0-.4-(k-W)/2:O.spine1+.4+(k-W)/2,pe=h+$*(.3/2+7.2),De=h+$*.3/2;V.forEach((Xe,X)=>{X&&(oe+=ee*ip);let te={gi:Xe.gi,aisle:$,sub:y,xWall:pe,xSpine:De,from:oe};Xe.slots.forEach(de=>{let se=oe+ee*de.len/2,Se={gi:Xe.gi,wi:de.wi,x:pe,side:$<0?-1:1,z:se,w:de.sp[0],h:de.sp[1],work:de.P,sub:y,aisle:$};if(u.works.push(Se),O.works.push(Se),de.Q){let Pe={gi:Xe.gi,wi:de.wi+1,x:De,side:$<0?1:-1,z:se,w:de.sq[0],h:de.sq[1],work:de.Q,sub:y,aisle:$};u.works.push(Pe),O.works.push(Pe)}oe+=ee*de.len}),te.z0=Math.max(te.from,oe),te.z1=Math.min(te.from,oe),u.bays.push(te),O.bays.push(te)})};K(_[y],-1,R),K(E[y],1,F),u.rooms.push(O),S=O.z1-He}return u.zEnd=u.rooms[x-1].z1,u.bays.sort((y,R)=>y.aisle-R.aisle||(y.aisle<0?R.z0-y.z0:y.z0-R.z0)),u}),o=[{x0:i.x0+Tn,x1:i.x1-Tn,z0:i.z0+Tn,z1:i.z1-Tn}];return a.forEach(l=>{o.push({x0:l.cx-Tt/2+.3,x1:l.cx+Tt/2-.3,z0:l.zStart-1.2,z1:l.zStart+1.2}),l.rooms.forEach((c,h)=>{o.push({x0:l.cx-_t/2+Tn,x1:l.cx+_t/2-Tn,z0:c.z1+Tn,z1:c.z0-Tn}),h<l.rooms.length-1&&[-1,1].forEach(u=>{let d=qt(l,u);o.push({x0:d-Dt/2+.3,x1:d+Dt/2-.3,z0:c.z1-He-1.2,z1:c.z1+1.2})})})}),{hall:i,corridors:a,walk:o,block:s}}function Bn(r,e,t){let n=!1;for(let i of r.walk)if(e>=i.x0&&e<=i.x1&&t>=i.z0&&t<=i.z1){n=!0;break}if(!n)return!1;for(let i of r.block)if(e>=i.x0&&e<=i.x1&&t>=i.z0&&t<=i.z1)return!1;return!0}function hs(r,e,t){if(t>r.hall.z0)return-1;for(let n of r.corridors)if(Math.abs(e-n.cx)<=_t/2+.01)return n.i;return-1}function jn(r,e,t){let n=hs(r,e,t);if(n<0)return null;let i=r.corridors[n].rooms;for(let s of i)if(t<=s.z0+.01&&t>=s.z1-He)return s;return i[i.length-1]}function eu(r,e,t){let n=jn(r,e,t);return!n||t>n.spine0-.2||t<n.spine1+.2}function ra(r){let e=Math.min(6,Math.max(1.9,r.h*1.45+.7,r.w*.95+.6));return{x:r.x-r.side*e,z:r.z,yaw:r.side<0?Math.PI/2:-Math.PI/2}}var P_=125,I_=14,us=new P,rp=[-1,-1,1,1];function Qo(r,e,t,n,i,s){let a=1/0,o=1/0,l=-1/0,c=-1/0,h=[[e,n],[t,n],[e,i],[t,i]];for(let[u,d]of h){if(us.set(u,d,s).applyMatrix4(r.matrixWorldInverse),us.z>-r.near*4)return rp;us.applyMatrix4(r.projectionMatrix),a=Math.min(a,us.x),l=Math.max(l,us.x),o=Math.min(o,us.y),c=Math.max(c,us.y)}return[a,o,l,c]}function tu(r,e){let t=[Math.max(r[0],e[0]),Math.max(r[1],e[1]),Math.min(r[2],e[2]),Math.min(r[3],e[3])];return t[0]<t[2]&&t[1]<t[3]?t:null}function L_(r,e){let t=[];if(e==="hall"){for(let a of r.corridors)t.push({to:a.rooms[0],x0:a.cx-Tt/2,x1:a.cx+Tt/2,y1:Gt,z:r.hall.z0});return t}let n=r.corridors[e.sec],i=e.idx;i===0&&t.push({to:"hall",x0:n.cx-Tt/2,x1:n.cx+Tt/2,y1:Gt,z:r.hall.z0});let s=(a,o)=>[-1,1].forEach(l=>{let c=qt(n,l);t.push({to:o,x0:c-Dt/2,x1:c+Dt/2,y1:An,z:a.z1-He/2})});return i>0&&s(n.rooms[i-1],n.rooms[i-1]),i<n.rooms.length-1&&s(e,n.rooms[i+1]),t}function ap(r,e,t,n){e.updateMatrixWorld();let i=new Set,s=new Map,a=!1,o=jn(r,t,n)||"hall",l=(c,h,u,d)=>{if(c==="hall")a=!0;else{i.add(c);let f=s.get(c);s.set(c,f?[Math.min(f[0],h[0]),Math.min(f[1],h[1]),Math.max(f[2],h[2]),Math.max(f[3],h[3])]:h)}if(!(d>=I_))for(let f of L_(r,c)){if(f.to===u)continue;let m=f.z+(n>f.z?1:-1)*He/2;if(Math.abs(m-n)>P_)continue;let b=Qo(e,f.x0,f.x1,0,f.y1,m),g=tu(h,b);g&&l(f.to,g,c,d+1)}};return l(o,rp,null,0),{hall:a,rooms:i,win:s}}function or(r,e=!1){let t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,l=new pt,c=0;for(let h=0;h<r.length;++h){let u=r[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,u=[];for(let d=0;d<r.length;++d){let f=r[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=r[d].attributes.position.count}l.setIndex(u)}for(let h in s){let u=op(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let b=0;b<a[h].length;++b)f.push(a[h][b][d]);let m=op(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function op(r){let e,t,n,i=-1,s=0;for(let c=0;c<r.length;++c){let h=r[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}let a=new e(s),o=new ut(a,t,n),l=0;for(let c=0;c<r.length;++c){let h=r[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<t;m++){let b=h.getComponent(d,m);o.setComponent(d+u,m,b)}}else a.set(h.array,l);l+=h.count*t}return i!==void 0&&(o.gpuType=i),o}function nu(r,e){if(e===Of)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===sa||e===jo){let t=r.getIndex();if(t===null){let a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}let n=t.count-2,i=[];if(e===sa)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}var $o=class extends Zs{constructor(){super();let e=new dt;e.deleteAttribute("uv");let t=new vt({side:Jt}),n=new vt,i=new xi(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let s=new Ne(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);let a=new Ne(e,n);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);let o=new Ne(e,n);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);let l=new Ne(e,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);let c=new Ne(e,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);let h=new Ne(e,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);let u=new Ne(e,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);let d=new Ne(e,lr(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);let f=new Ne(e,lr(50));f.position.set(-16.109,18.021,-8.207),f.scale.set(.1,2.425,2.751),this.add(f);let m=new Ne(e,lr(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);let b=new Ne(e,lr(43));b.position.set(-.462,8.89,14.52),b.scale.set(4.38,5.441,.088),this.add(b);let g=new Ne(e,lr(20));g.position.set(3.235,11.486,-12.541),g.scale.set(2.5,2,.1),this.add(g);let p=new Ne(e,lr(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function lr(r){let e=new et;return e.color.setScalar(r),e}var Hi={max:0,lo:!1},el=class{constructor(e,t,n){this.bridge=t,this.tier=n||Hi.lo?"lo":"hi",this.aniso=Math.min(n?4:16,e.capabilities.getMaxAnisotropy()),this.loader=new Xn,this.loader.setCrossOrigin("anonymous"),this.cache={},this.clones={},this.pending=0,this.onLoad=null,this.mats=[]}tex(e,t){let n=e+"_"+t;if(this.cache[n])return this.cache[n];this.pending++;let i=()=>{this.pending--,this.onLoad&&this.onLoad(this.pending)},s=()=>{(this.clones[n]||[]).forEach(u=>{u.needsUpdate=!0}),delete this.clones[n],i()},a=this.bridge.url("gallery-assets/"+this.tier+"/"+n+".webp"),o,l=0,c=()=>{if(++l<2){setTimeout(h,1500);return}this.strip(n),i()},h=()=>{Hi.max&&typeof createImageBitmap=="function"?fetch(a,{mode:"cors",credentials:"omit"}).then(u=>{if(!u.ok)throw new Error(u.status);return u.blob()}).then(u=>createImageBitmap(u,{imageOrientation:"flipY",premultiplyAlpha:"none",colorSpaceConversion:"none",resizeWidth:Hi.max,resizeHeight:Hi.max,resizeQuality:"high"})).then(u=>{o.image=u,o.needsUpdate=!0,s()},c):this.loader.load(a,u=>{o.image=u.image,o.needsUpdate=!0,s()},void 0,c)};return o=new St,Hi.max&&typeof createImageBitmap=="function"&&(o.flipY=!1),h(),o.wrapS=o.wrapT=Qt,o.anisotropy=this.aniso,o.colorSpace=t==="color"?je:Wn,this.cache[n]=o,o}strip(e){let t=this.cache[e];for(let n of this.mats){let i=!1;for(let s of["map","normalMap","roughnessMap","metalnessMap","aoMap"])n[s]===t&&(n[s]=null,i=!0);i&&(n.roughnessMap||(n.roughness=n.userData.roughness!=null?n.userData.roughness:.85),n.metalnessMap||(n.metalness=n.userData.metalness!=null?n.userData.metalness:0),n.needsUpdate=!0)}window.console&&console.warn("[artgallery] \u0444\u0430\u043A\u0442\u0443\u0440\u0430 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0430\u0441\u044C:",e)}clone(e,t){let n=this.tex(e,t),i=n.source.version,s=n.clone();if(n.image)s.source.version=i;else{s.version=0;let a=e+"_"+t;(this.clones[a]=this.clones[a]||[]).push(s)}return s}material(e,t={}){let n=this.tex(e,"orm"),i=new vt(Object.assign({normalMap:this.tex(e,"normal"),roughnessMap:n,metalnessMap:n,aoMap:n,roughness:1,metalness:1},t));return t.color===void 0&&(i.map=this.tex(e,"color")),this.mats.push(i),i}};var cr=null;function lp(r){return cr||(cr=fetch(r,{mode:"cors",credentials:"omit"}).then(e=>{if(!e.ok)throw new Error("ltc.bin: "+e.status);return e.arrayBuffer()}).then(e=>{let n=new Uint16Array(e);if(n.length!==16384*2)throw new Error("ltc.bin: \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440");let i=o=>{let l=new Sn(o,64,64,Zt,Pt,qo,_n,_n,Vt,Rt,1);return l.needsUpdate=!0,l},s=i(n.slice(0,16384)),a=i(n.slice(16384));return ce.LTC_FLOAT_1=ce.LTC_HALF_1=s,ce.LTC_FLOAT_2=ce.LTC_HALF_2=a,!0}),cr.catch(()=>{cr=null}),cr)}var iu=7;function su(){return iu=iu*16807%2147483647,(iu-1)/2147483646}function tl(r,e){let t=document.createElement("canvas");return t.width=r,t.height=e||r,t}function hp(){let t=tl(256),n=t.getContext("2d");return n.filter="blur(18px)",n.fillStyle="#000",n.fillRect(48,48,160,160),n.filter="none",new en(t)}var Ze='"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif';function sn(r,e,t){let n=tl(r,e);return t(n.getContext("2d"),r,e),n}function ru(r,e,t){let n=String(e||"").split(/\s+/),i=[],s="";for(let a of n){let o=s?s+" "+a:a;r.measureText(o).width>t&&s?(i.push(s),s=a):s=o}return s&&i.push(s),i}function Yn(r,e,t,n){let i=n.size,s=n.min||Math.round(i*.6),a=n.weight||400,o=n.maxLines||1,l=String(e||"").replace(/\s+/g," ").trim(),c=d=>{r.font=a+" "+d+"px "+Ze};for(let d=i;d>=s;d-=1){c(d);let f=cp(r,l,t);if(f.length<=o)return{size:d,lines:f,cut:!1}}c(s);let h=cp(r,l,t).slice(0,o),u=h[o-1];for(;u&&r.measureText(u+"\u2026").width>t;){let d=u.lastIndexOf(" ");u=d>0&&u.length-d<12?u.slice(0,d):u.slice(0,-1)}return h[o-1]=u.replace(/[\s,.;:«(—-]+$/,"")+"\u2026",{size:s,lines:h,cut:!0}}function cp(r,e,t){let n=[];return ru(r,e,t).forEach(i=>{for(;r.measureText(i).width>t&&i.length>1;){let s=i.length-1;for(;s>1&&r.measureText(i.slice(0,s)).width>t;)s--;n.push(i.slice(0,s)),i=i.slice(s)}n.push(i)}),n}function Xt(r,e,t,n,i){"letterSpacing"in r?(r.letterSpacing=i+"px",r.fillText(e,t,n),r.letterSpacing="0px"):r.fillText(e,t,n)}function bi(r,e){let t=new en(r);return t.colorSpace=je,t.anisotropy=e||1,t}function up(){let r=tl(4,128),e=r.getContext("2d"),t=e.createImageData(4,128);for(let n=0;n<128;n++){let i=1-n/127,s=Math.round(255*Math.pow(i,2.2));for(let a=0;a<4;a++){let o=(n*4+a)*4;t.data[o]=t.data[o+1]=t.data[o+2]=s,t.data[o+3]=255}}return e.putImageData(t,0,0),new en(r)}function dp(){let t=tl(512,768),n=t.getContext("2d"),i=(o,l,c,h,u)=>{n.save(),n.translate(o,l),n.rotate(h),n.fillStyle=u,n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(c*.35,-c*.3,c*.8,-c*.25,c,0),n.bezierCurveTo(c*.8,c*.25,c*.35,c*.3,0,0),n.fill(),n.strokeStyle="rgba(255,255,255,0.18)",n.lineWidth=2,n.beginPath(),n.moveTo(c*.08,0),n.lineTo(c*.9,0),n.stroke(),n.restore()};n.strokeStyle="#6b5a45",n.lineWidth=9,n.beginPath(),n.moveTo(512/2,768),n.bezierCurveTo(512/2-10,768*.6,512/2+14,768*.35,512/2,768*.12),n.stroke();let s=["#2f5e3a","#3a6f45","#28512f","#447a4c","#335f3b"];for(let o=0;o<90;o++){let l=o/90,c=768*(.06+l*.68),h=o%2?1:-1,u=(110+su()*70)*(.75+l*.45),d=(h>0?0:Math.PI)+h*(-1.1+l*.8+(su()-.5)*.6);i(512/2+h*4,c,u,d,s[Math.floor(su()*s.length)])}let a=new en(t);return a.colorSpace=je,a}var D_=15526888,U_=14868699,hr="#2a2a2a",_i="#8c8c88",nl="#d4574f",N_=16,k_=26,F_=40,O_=55,aa=1.55;function B_(r){let e=String(r).match(/[«"]([^»"]+)[»"]/);return(e?e[1]:String(r).split(/\s+/)[0]).replace(/[,.;:]+$/,"")}function z_(r,e,t,n){let i=r%10,s=r%100;return i===1&&s!==11?e:i>=2&&i<=4&&(s<12||s>14)?t:n}var lu=new Te,fp=new Ft,il=new P,sl=new P,ur=new Wt;function ou(r,e,t,n){let i=new On(r,e,Math.max(1,t.length));return t.forEach((s,a)=>{ur.set(0,0,0),n(s,sl,ur,il),fp.setFromEuler(ur),lu.compose(sl,fp,il),i.setMatrixAt(a,lu)}),i.count=t.length,i.instanceMatrix.needsUpdate=!0,i.computeBoundingSphere(),i}function H_(){let r=new Jr;r.moveTo(-.004,0),r.lineTo(-.004,.056),r.lineTo(.006,.056),r.lineTo(.01,.05),r.lineTo(.036,.05),r.quadraticCurveTo(.045,.05,.045,.041),r.lineTo(.045,0),r.lineTo(-.004,0);let e=new Po(r,{depth:1,bevelEnabled:!1,curveSegments:4});return e.applyMatrix4(new Te().set(0,0,1,-.5,1,0,0,0,0,1,0,0,0,0,0,1)),e.computeVertexNormals(),e}var V_=`
{
  // \u043E\u0441\u0432\u0435\u0449\u0451\u043D\u043D\u043E\u0441\u0442\u044C: \u0432\u043E \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0440\u0430\u0437 \u0441\u0432\u0435\u0442 \u0432 \u044D\u0442\u043E\u0439 \u0442\u043E\u0447\u043A\u0435 \u044F\u0440\u0447\u0435 \xAB\u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E\u0433\u043E\xBB (uLit.x);
  // \u0446\u0432\u0435\u0442 \u0432\u0441\u0435\u0433\u0434\u0430 \u0438\u0437 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F, \u0441\u0432\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u043B\u0435\u0433\u043A\u0430 \u043C\u0435\u043D\u044F\u0435\u0442 \u044F\u0440\u043A\u043E\u0441\u0442\u044C \u2014 \u0432 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u0445 uLit.zw
  vec3 src = diffuseColor.rgb;
  const vec3 LW = vec3( 0.2126, 0.7152, 0.0722 );
  float ratio = dot( gl_FragColor.rgb, LW ) / max( dot( src, LW ), 1e-3 );
  float f = clamp( 1.0 + ( ratio / uLit.x - 1.0 ) * uLit.y, uLit.z, uLit.w );
  gl_FragColor.rgb = mix( src * f, src, uNatural );
}
if ( uInvTM > 0.5 ) {
  vec3 c = max( gl_FragColor.rgb, vec3( 0.0 ) );
  float pk = max( c.r, max( c.g, c.b ) );
  if ( pk > 0.76 ) {
    // \u043D\u0435 \u0432\u044B\u0448\u0435 0.955: \u0438\u043D\u0430\u0447\u0435 \u0447\u0438\u0441\u0442\u043E \u0431\u0435\u043B\u043E\u0435 \u0443\u0445\u043E\u0434\u0438\u043B\u043E \u0431\u044B \u0432 \u044F\u0440\u043A\u043E\u0441\u0442\u044C \xD712, \u0438 \u0441\u0432\u0435\u0447\u0435\u043D\u0438\u0435
    // (bloom) \u0437\u0430\u043B\u0438\u0432\u0430\u043B\u043E \u0431\u044B \u0441\u0432\u0435\u0442\u043B\u044B\u0435 \u0440\u0430\u0431\u043E\u0442\u044B \u0431\u0435\u043B\u044B\u043C \u043E\u0440\u0435\u043E\u043B\u043E\u043C
    float np = min( pk, 0.955 );
    float p0 = 0.0576 / ( 1.0 - np ) - 0.24 + 0.76;
    c *= p0 / pk;
  }
  float m = min( c.r, min( c.g, c.b ) );
  float m0 = m < 0.04 ? sqrt( m / 6.25 ) : m + 0.04;
  gl_FragColor.rgb = c + ( m0 - m );
}
`;function G_(r){return r.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      #ifdef USE_INSTANCING
        float barLen = length(instanceMatrix[0].xyz);
        transformed.x = sign(position.x) * (0.5 + (position.y - 0.045) / barLen);
      #endif`)},r.customProgramCacheKey=()=>"artg-mitre",r}function W_(r,e,t){let n=Qo(r,e,e,1.72-t.h/2,1.72+t.h/2,t.z-t.w/2),i=Qo(r,e,e,1.72-t.h/2,1.72+t.h/2,t.z+t.w/2);return n[0]===-1&&n[2]===1||i[0]===-1&&i[2]===1?[-1,-1,1,1]:[Math.min(n[0],i[0]),Math.min(n[1],i[1]),Math.max(n[2],i[2]),Math.max(n[3],i[3])]}var q_=12,X_=2.8;function At(r,e){return Object.assign(r.userData,{batch:!0},e||{}),r}function j_(r,e){let t=r.attributes.position,n=r.attributes.normal,i=r.attributes.uv;for(let s=0;s<t.count;s++){let a=Math.abs(n.getX(s)),o=Math.abs(n.getY(s)),l=Math.abs(n.getZ(s)),c=t.getX(s),h=t.getY(s),u=t.getZ(s);a>=o&&a>=l?i.setXY(s,u/e,h/e):o>=l?i.setXY(s,c/e,u/e):i.setXY(s,c/e,h/e)}}var rl=class{constructor(e,t,n){this.plan=t,this.bridge=n,this.scene=new Zs,this.aniso=Math.min(8,e.capabilities.getMaxAnisotropy()),this.paintings=[],this.pendingProps=[],this.pickables=[],this.plaques=new Map,this.banners=new Map,this.bays=[];let i=new fe(D_);this.scene.background=i,this.scene.fog=new fo(i,30,120),this.pbr=new el(e,n,e.capabilities.maxTextureSize<8192||/Mobi|Android|iPhone|iPad/.test(navigator.userAgent));let s=new ki(e),a=new $o;this.scene.environment=s.fromScene(a,.04).texture,this.scene.environmentIntensity=.32,a.dispose(),s.dispose(),this.areaLights=[],this.ecoLights=[],this.hemi=new Fo(16776696,13223615,.55),this.scene.add(this.hemi),this.natural={value:0},this.invTM={value:0},this.lit={value:new tt(1.8,.24,.85,1.12)},this.camLight=new xi(16775922,5,14,1.6),this.scene.add(this.camLight),this.mat=this.makeMaterials(),this.onPaintings=null,this.props=null}build(){let e=this.plan;this.hallGroup=this.group(),this.hallNorth=this.group(),this.target=this.hallGroup,this.beginBatch(),this.buildHall(),this.endBatch(),this.target=null,e.corridors.forEach(t=>this.prepareSection(t)),e.corridors.forEach(t=>this.ensureRoom(t.rooms[0]))}makeMaterials(){let e=this.aniso;return{frame:G_(new vt({color:1381653,roughness:.42,metalness:0})),gap:At(new et({color:10131861})),reveal:At(new vt({color:13817046,roughness:.34,metalness:1})),light:At(new et({color:new fe(3,2.9,2.75),fog:!1})),lens:new et({color:new fe(9,8.2,7.2),fog:!1}),slot:At(new et({color:14276820})),track:At(this.pbr.material("metal"),{tile:.6}),shadow:At(new et({alphaMap:hp(),color:0,transparent:!0,opacity:.2,depthWrite:!1})),ao:At(new et({color:0,alphaMap:up(),transparent:!0,opacity:.2,depthWrite:!1,side:Ht,polygonOffset:!0,polygonOffsetFactor:-2})),pot:At(new vt({color:14210769,roughness:.85})),soil:At(new ls({color:3879209})),white:At(new vt({color:16184818,roughness:.55,metalness:0})),oak:At(this.pbr.material("oak"),{tile:1.2}),grey:At(new vt({color:11908272,roughness:.3,metalness:0}))}}get wall(){return this._wall||(this._wall=At(this.pbr.material("wall",{normalScale:new G(.6,.6)}),{tile:3,blocker:!0}))}get ceil(){return this._ceil||(this._ceil=At(this.pbr.material("ceiling",{emissive:16777215,emissiveIntensity:.1}),{tile:3}))}get floorMat(){return this._floor||(this._floor=At(this.pbr.material("floor",{envMapIntensity:1,roughness:.62,normalScale:new G(.35,.35)}),{tile:4,floor:!0}))}wallMat(){return this.wall}ceilMat(){return this.ceil}box(e,t,n,i,s,a,o){if(this.batch&&i.userData.batch){let c=new dt(e,t,n);return c.translate(s,a,o),this.push(i,c),null}let l=new Ne(new dt(e,t,n),i);return l.position.set(s,a,o),this.add(l),l}plane(e,t,n,i,s,a,o=0,l=0){if(this.batch&&n.userData.batch){let h=new wt(e,t);return h.applyMatrix4(lu.makeRotationFromEuler(ur.set(l,o,0,"YXZ"))),h.translate(i,s,a),this.push(n,h),null}let c=new Ne(new wt(e,t),n);return c.position.set(i,s,a),c.rotation.set(l,o,0,"YXZ"),this.add(c),c}cyl(e,t,n,i,s,a,o,l){let c=new Lt(e,t,n,i);if(c.translate(a,o,l),this.batch&&s.userData.batch)return this.push(s,c),null;let h=new Ne(c,s);return this.add(h),h}geoMesh(e,t){if(this.batch&&t.userData.batch)return this.push(t,e),null;let n=new Ne(e,t);return this.add(n),n}add(e){(this.target||this.scene).add(e)}group(){let e=new Mt;return this.scene.add(e),e}blocker(e){return e&&(e.userData.blocker=!0,this.pickables.push(e)),e}beginBatch(){this.batch=new Map}push(e,t){e.userData.tile&&j_(t,e.userData.tile),this.batch.has(e)||this.batch.set(e,[]),this.batch.get(e).push(t)}endBatch(){let e=this.batch;if(this.batch=null,!!e)for(let[t,n]of e){n.some(a=>!a.index)&&n.forEach((a,o)=>{a.index&&(n[o]=a.toNonIndexed(),a.dispose())});let i=or(n,!1);if(n.forEach(a=>a.dispose()),!i)continue;let s=new Ne(i,t);this.add(s),(t===this._wall||t===this._floor||t===this._ceil)&&(s.receiveShadow=!0),t===this._wall&&(s.castShadow=!0),t.userData.blocker&&this.blocker(s),t.userData.floor&&(s.userData.floor=!0,this.pickables.push(s))}}setTarget(e){let t=!!this.batch;t&&this.endBatch(),this.target=e,t&&this.beginBatch()}floor(e,t,n,i){return this.plane(t-e,i-n,this.floorMat,(e+t)/2,0,(n+i)/2,0,-Math.PI/2)}sign(e,t,n,i,s,a,o,l){let c=new et({map:bi(e,this.aniso),transparent:!0,toneMapped:!1}),h=this.plane(t,n,c,i,s,a,o);return l&&(h.userData.action=l,this.pickables.push(h)),h}buildHall(){let{hall:e,corridors:t}=this.plan,n=this.mat,i=e.x1-e.x0,s=e.z1-e.z0,a=e.h;this.floor(e.x0,e.x1,e.z0,e.z1),this.plane(i,s,this.ceilMat(i,s),0,a,0,0,Math.PI/2);for(let x=-1;x<=1;x++)for(let E=-1;E<=1;E+=2)this.plane(i/4.2,1.1,n.light,x*i/3.3,a-.01,E*s/4.5,0,Math.PI/2);[-1,1].forEach(x=>{let E=new sr(16774890,3.2,i*.85,1.4);E.position.set(0,a-.02,x*s/4.5),E.lookAt(0,0,x*s/4.5),E.visible=!!this.ltcReady,this.add(E),this.areaLights.push(E);let w=new xi(16774890,q_,Math.max(i,s)*.9,1);w.position.set(0,a-.6,x*s/4.5),w.visible=!this.ltcReady,this.add(w),this.ecoLights.push(w)}),this.plane(i-1,.08,n.light,0,a-.01,e.z1-.5,0,Math.PI/2),this.plane(.08,s-1,n.light,e.x0+.5,a-.01,0,0,Math.PI/2),this.plane(.08,s-1,n.light,e.x1-.5,a-.01,0,0,Math.PI/2),this.box(i+He*2,a,He,this.wallMat(i,a),0,a/2,e.z1+He/2),this.box(He,a,s,this.wallMat(s,a),e.x0-He/2,a/2,0),this.box(He,a,s,this.wallMat(s,a),e.x1+He/2,a/2,0),this.setTarget(this.hallNorth);let o=e.z0,l=t.map(x=>[x.cx-Tt/2,x.cx+Tt/2]),c=e.x0-He;l.concat([[e.x1+He,e.x1+He]]).forEach(([x,E])=>{x-c>.01&&this.blocker(this.box(x-c,a,He,this.wallMat(x-c,a),(c+x)/2,a/2,o)),E>x&&this.box(E-x,a-Gt,He,this.wallMat(E-x,a-Gt),(x+E)/2,Gt+(a-Gt)/2,o),c=E}),this.aoWallX(e.x0,e.z1,e.z0,1,a),this.aoWallX(e.x1,e.z1,e.z0,-1,a),this.aoWallZ(e.z1,e.x0,e.x1,-1,a);let h=e.x0;t.map(x=>[x.cx-Tt/2,x.cx+Tt/2]).concat([[e.x1,e.x1]]).forEach(([x,E])=>{x>h&&this.aoWallZ(e.z0+He/2,h,x,1,a),h=E});let u=new ls({map:dp(),alphaTest:.5,side:Ht});[[e.x0+1.3,e.z0+1.3],[e.x1-1.3,e.z0+1.3]].forEach(([x,E])=>{this.cyl(.36,.3,.72,28,n.pot,x,.36,E),this.cyl(.33,.33,.02,28,n.soil,x,.7,E),this.plane(1.3,1.3,n.shadow,x,.004,E,0,-Math.PI/2);for(let w=0;w<3;w++){let T=new Ne(new wt(1.7,2.55),u);T.position.set(x,.7+1.25,E),T.rotation.y=w*Math.PI/3,this.add(T)}this.plan.block.push({x0:x-.8,x1:x+.8,z0:E-.8,z1:E+.8})});let d=.035;this.box(i,d,.01,n.gap,0,d/2,e.z1-.004),this.box(.01,d,s,n.gap,e.x0+.004,d/2,0),this.box(.01,d,s,n.gap,e.x1-.004,d/2,0),t.forEach(x=>{this.box(.02,Gt,He,n.reveal,x.cx-Tt/2+.01,Gt/2,o),this.box(.02,Gt,He,n.reveal,x.cx+Tt/2-.01,Gt/2,o),this.box(Tt,.02,He,n.reveal,x.cx,Gt-.01,o);let E=x.count,w=sn(1024,300,(I,S)=>{I.fillStyle=hr,I.textAlign="center",I.font="300 92px "+Ze,Xt(I,(x.title||"\u042D\u043A\u0441\u043F\u043E\u0437\u0438\u0446\u0438\u044F").toUpperCase(),S/2,130,14),I.fillStyle=_i,I.font="400 40px "+Ze,I.fillText(E+" "+z_(E,"\u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A","\u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0430","\u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u043E\u0432")+"   \u2192",S/2,220)});this.sign(w,3.6,1.05,x.cx,Gt+.85,o+He/2+.005,0,{type:"enter",room:x.i});let T=sn(768,160,(I,S)=>{I.fillStyle=_i,I.textAlign="center",I.font="400 58px "+Ze,Xt(I,"\u2190  \u0425\u041E\u041B\u041B",S/2,100,8)});this.sign(T,1.8,.375,x.cx,Gt+.5,o-He/2-.005,Math.PI,{type:"hall"})}),this.setTarget(this.hallGroup);let f=e.x0+1.5;this.box(1,1.05,3.6,n.white,f,.545,2.4),this.box(1.04,.02,3.64,n.grey,f,1.08,2.4),this.box(.94,.03,3.54,n.gap,f,.015,2.4),this.plan.block.push({x0:f-.95,x1:f+.95,z0:2.4-2.2,z1:2.4+2.2}),[-1,1].forEach(x=>{let E=x*3.4,w=2.6;this.box(2.6,.06,.5,n.oak,E,.44,w),this.box(.06,.41,.46,n.oak,E-1.1,.205,w),this.box(.06,.41,.46,n.oak,E+1.1,.205,w),this.plan.block.push({x0:E-1.75,x1:E+1.75,z0:w-.7,z1:w+.7})});let m=this.bridge.url("img/logo.png");new Xn().setCrossOrigin("anonymous").load(m,x=>{x.colorSpace=je,x.anisotropy=this.aniso;let E=x.image.width/x.image.height||2,w=1.6,T=new et({map:x,transparent:!0,toneMapped:!1}),I=this.target;this.target=this.hallGroup,this.plane(w*E,w,T,e.x0+.005,3.2,-2.4,Math.PI/2),this.target=I});let b=sn(1024,160,(x,E)=>{x.fillStyle=_i,x.textAlign="center",x.font="300 56px "+Ze,Xt(x,"\u0412\u0421\u0415 \u0413\u0420\u0410\u041D\u0418 \u0418\u0421\u041A\u0423\u0421\u0421\u0422\u0412\u0410",E/2,100,10)});this.sign(b,3.4,.53,e.x0+.006,2.05,-2.4,Math.PI/2);let g=this.bridge.ticketUrl&&this.bridge.ticketUrl!=="#",p=sn(1400,900,x=>{x.fillStyle=hr,x.textAlign="left",x.font="200 190px "+Ze,x.fillText("\u0410\u0440\u0442-\u0420\u043E\u0441\u0442\u043E\u0432",20,210),x.font="600 190px "+Ze,x.fillText("2027",20,420),x.fillStyle=_i,x.font="400 52px "+Ze,ru(x,"\u0412\u044B\u0441\u0442\u0430\u0432\u043A\u0430-\u043F\u0440\u043E\u0434\u0430\u0436\u0430 \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0438\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u0430",1100).forEach((E,w)=>x.fillText(E,24,540+w*66)),g&&(x.fillStyle=nl,x.font="500 60px "+Ze,x.fillText("\u041A\u0443\u043F\u0438\u0442\u044C \u0431\u0438\u043B\u0435\u0442  \u2192",24,780),x.fillRect(24,800,470,4))});this.sign(p,4.2,2.7,e.x1-.006,2.55,-1.2,-Math.PI/2,g?{type:"url",href:this.bridge.ticketUrl}:null);let _=sn(1024,200,(x,E)=>{x.fillStyle="rgba(42,42,42,0.45)",x.textAlign="center",x.font="400 62px "+Ze,Xt(x,"\u0412\u042B\u0411\u0415\u0420\u0418\u0422\u0415 \u0417\u0410\u041B",E/2,120,16)});this.sign(_,4.2,.82,0,.005,e.z0+3.2,0).rotation.set(-Math.PI/2,0,0),this.plantMat=u,this.props&&this.props.hall()}prepareSection(e){e.parts=[],e.rooms.forEach(t=>{let n=t.bays.map(i=>B_(this.bridge.artists[i.gi].name));t.label=n.length>1?n[0]+" \u2014 "+n[n.length-1]:n[0]||"",t.sectionRef=e,t.group=null}),e.works.forEach(t=>{t.room=e.i,t.level=0}),e.bays.forEach(t=>{t.room=e,this.bays.push(t)})}ensureRoom(e,t=!0){if(e.group)return t&&e.propsPending&&this.roomProps(e),!1;let n=e.sectionRef,i=this.target;return e.group=this.group(),this.target=e.group,this.beginBatch(),this.buildRoom(n,e,e.idx),this.endBatch(),this.target=i,e.idx>0&&this.ensurePart(n,e.idx-1),e.idx<n.rooms.length-1&&this.ensurePart(n,e.idx),e.propsPending=!0,t?this.roomProps(e):this.pendingProps.push(e),!0}roomProps(e,t=!0){if(!e||!e.propsPending)return!1;if(!this.props)return e.propsPending=!1,!1;e.propSteps||(e.propSteps=this.props.roomSteps(e.sectionRef,e),e.propBatch=new Map);let n=this.target,i=this.batch;this.target=e.group,this.batch=e.propBatch;do e.propSteps.shift()();while(t&&e.propSteps.length);if(!e.propSteps.length){this.endBatch(),e.propsPending=!1,e.propSteps=e.propBatch=null;let s=this.pendingProps.indexOf(e);s>=0&&this.pendingProps.splice(s,1)}return this.batch=i,this.target=n,!0}buildRoom(e,t,n){let i=this.mat,s=5,a=n===e.rooms.length-1,o=e.cx-_t/2,l=e.cx+_t/2,c=t.z0,h=a?t.z1:t.z1-He,u=c-h,d=(c+h)/2;if(t.lightMat=i.light.clone(),t.lensMat=i.lens.clone(),t.lightBase=i.light.color.clone(),t.lensBase=i.lens.color.clone(),this.floor(o,l,h,c),this.plane(_t,u,this.ceilMat(_t,u),e.cx,s,d,0,Math.PI/2),this.blocker(this.plane(u,s,this.wallMat(u,s),o,s/2,d,Math.PI/2)),this.blocker(this.plane(u,s,this.wallMat(u,s),l,s/2,d,-Math.PI/2)),[[o,1],[l,-1]].forEach(([x,E])=>{this.aoWallX(x,c,h,E,s),this.box(.01,.035,u,i.gap,x+E*.004,.0175,d),this.plane(.12,u,i.slot,x+E*.55,s-.005,d,0,Math.PI/2),this.plane(.06,u,t.lightMat,x+E*.55,s-.008,d,0,Math.PI/2)}),n===0&&(this.aoWallZ(t.z0,o,e.cx-Tt/2,-1,s),this.aoWallZ(t.z0,e.cx+Tt/2,l,-1,s)),a){this.aoWallZ(e.zEnd,o,l,1,s),this.blocker(this.plane(_t,s,this.wallMat(_t,s),e.cx,s/2,e.zEnd,0));let x=sn(1024,420,(E,w)=>{E.textAlign="center",E.fillStyle=_i;let T=Yn(E,"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0437\u0430\u043B \u0440\u0430\u0437\u0434\u0435\u043B\u0430 \xAB"+(e.title||"\u042D\u043A\u0441\u043F\u043E\u0437\u0438\u0446\u0438\u044F")+"\xBB",w-60,{size:44,min:30,maxLines:1});E.fillText(T.lines[0],w/2,120),E.font="400 44px "+Ze,E.fillText("\u041E\u0431\u0440\u0430\u0442\u043D\u043E \u043A \u0445\u043E\u043B\u043B\u0443 \u2014 \u043F\u043E \u043F\u0440\u0430\u0432\u043E\u0439 \u0441\u0442\u043E\u0440\u043E\u043D\u0435",w/2,190),E.fillStyle=nl,E.font="500 60px "+Ze,E.fillText("\u0421\u0440\u0430\u0437\u0443 \u0432 \u0445\u043E\u043B\u043B  \u2192",w/2,320),E.fillRect(w/2-230,345,460,4)});this.sign(x,3.4,1.39,e.cx,2.1,e.zEnd+.01,0,{type:"hall"})}let f=t.spine0-t.spine1,m=(t.spine0+t.spine1)/2;this.blocker(this.box(.3,4,f,this.wallMat(f,4),e.cx,4/2,m)),[-1,1].forEach(x=>{let E=e.cx+x*.3/2;this.ao([E+x*.003,.003,t.spine0],[E+x*.003,.003,t.spine1],[x*.5,0,0]),this.ao([E+x*.003,0,t.spine0],[E+x*.003,0,t.spine1],[0,.35,0])}),this.ao([e.cx-.3/2,.003,t.spine0+.003],[e.cx+.3/2,.003,t.spine0+.003],[0,0,.45]),this.ao([e.cx-.3/2,.003,t.spine1-.003],[e.cx+.3/2,.003,t.spine1-.003],[0,0,-.45]),this.box(.3+.02,.035,f-.02,i.gap,e.cx,.0175,m);let b=t.z0-t.z1-.6,g=(t.z0+t.z1)/2;[o+aa,e.cx-.3/2-aa,e.cx+.3/2+aa,l-aa].forEach(x=>{this.box(.035,.035,b,i.track,x,s-.02,g)});let p=sn(512,512,(x,E)=>{x.fillStyle=hr,x.textAlign="center",x.font="200 220px "+Ze,x.fillText(String(n+1),E/2,250),x.fillStyle=_i,x.font="400 40px "+Ze,Xt(x,"\u0417\u0410\u041B",E/2,330,14)});this.sign(p,.3,.3,e.cx,2.2,t.spine0+.004,0),this.sign(p,.3,.3,e.cx,2.2,t.spine1-.004,Math.PI);let _=t.works,v=x=>x.side<0?Math.PI/2:-Math.PI/2;if(_.length){this.add(ou(this.geo("plane"),i.shadow,_,(R,F,k,O)=>{F.set(R.x-R.side*.003,1.72-.07,R.z),k.set(0,v(R),0),O.set(R.w*1.12+.35,R.h*1.12+.4,1)}));let x=[];_.forEach(R=>{x.push([R,0,R.h/2,R.w+.045*2,0],[R,0,-R.h/2,R.w+.045*2,Math.PI],[R,-R.w/2,0,R.h+.045*2,Math.PI/2],[R,R.w/2,0,R.h+.045*2,-Math.PI/2])});let E=new On(this.geo("moulding"),i.frame,x.length),w=new Te,T=new Te,I=new Ft;x.forEach(([R,F,k,O,K],V)=>{I.setFromEuler(ur.set(0,v(R),0)),w.compose(sl.set(R.x,1.72,R.z),I,il.set(1,1,1)),T.compose(sl.set(F,k,0),I.setFromEuler(ur.set(0,0,K)),il.set(O,1,1)),E.setMatrixAt(V,w.multiply(T))}),E.instanceMatrix.needsUpdate=!0,E.computeBoundingSphere(),E.castShadow=!0,this.add(E);let S=(R,F,k,O)=>{F.set(R.x-R.side*aa,s-.15,R.z),k.set(0,0,R.side*.62),O.set(1,1,1)},y=ou(this.geo("spot"),i.track,_,S);y.castShadow=!0,this.add(y),this.add(ou(this.geo("lens"),t.lensMat,_,S))}_.forEach(x=>{let E=this.pbr.clone("canvas","normal"),w=this.pbr.clone("canvas","orm");E.repeat.set(x.w/.3,x.h/.3),w.repeat.copy(E.repeat);let T=this.paintingMat(new vt({color:U_,roughness:1,metalness:0,normalMap:E,normalScale:new G(.45,.45),roughnessMap:w,aoMap:w,aoMapIntensity:.6,envMapIntensity:.6})),I=this.plane(x.w,x.h,T,x.x-x.side*.046,1.72,x.z,v(x));I.userData.art=x,x.mesh=I,x.group=t.group,this.paintings.push(x),this.pickables.push(I)}),this.onPaintings&&_.length&&this.onPaintings(_)}paintingMat(e){let t=this.natural,n=this.invTM,i=this.lit;return e.onBeforeCompile=s=>{s.uniforms.uNatural=t,s.uniforms.uInvTM=n,s.uniforms.uLit=i,s.fragmentShader=`uniform float uNatural;
uniform float uInvTM;
uniform vec4 uLit;
`+s.fragmentShader.replace("#include <opaque_fragment>",`#include <opaque_fragment>
`+V_)},e.customProgramCacheKey=()=>"artg-painting",e.toneMapped=!1,e}geo(e){return this.geos=this.geos||{plane:new wt(1,1),box:new dt(1,1,1),spot:new Lt(.045,.055,.2,16),moulding:H_(),lens:new Co(.042,16).rotateX(Math.PI/2).translate(0,-.101,0)},this.geos[e]}ensurePart(e,t){if(e.parts[t])return;let n=this.mat,i=5,s=e.rooms[t],a=e.rooms[t+1],o=this.target,l=this.target=this.group();e.parts[t]=l,this.beginBatch();let c=e.cx-_t/2,h=e.cx+_t/2,u=s.z1-He/2,d=qt(e,-1),f=qt(e,1),m=[[c,d-Dt/2],[d+Dt/2,f-Dt/2],[f+Dt/2,h]];m.forEach(([p,_])=>this.blocker(this.box(_-p,i,He,this.wallMat(_-p,i),(p+_)/2,i/2,u))),[d,f].forEach(p=>{this.box(Dt,i-An,He,this.wallMat(Dt,i-An),p,An+(i-An)/2,u),this.box(.02,An,He,n.reveal,p-Dt/2+.01,An/2,u),this.box(.02,An,He,n.reveal,p+Dt/2-.01,An/2,u),this.box(Dt,.02,He,n.reveal,p,An-.01,u)}),this.box(_t,.035,.01,n.gap,e.cx,.0175,u+He/2+.004),this.box(_t,.035,.01,n.gap,e.cx,.0175,u-He/2-.004),m.forEach(([p,_])=>{this.aoWallZ(u+He/2,p,_,1,i),this.aoWallZ(u-He/2,p,_,-1,i)});let b=(p,_,v)=>sn(1024,300,(x,E)=>{x.fillStyle=hr,x.textAlign="center",x.font="300 88px "+Ze,Xt(x,"\u0417\u0410\u041B "+p,E/2,120,16),x.fillStyle=_i;let w=Yn(x,_,E-60,{size:38,min:26,maxLines:2});w.lines.forEach((T,I)=>x.fillText(T,E/2,(w.lines.length>1?180:200)+I*w.size*1.15)),v&&(x.font="400 40px "+Ze,x.fillText(v,E/2,268))}),g=f-Dt/2-(d+Dt/2)-.6;this.sign(b(t+2,a.label,"\u2191"),g,g*300/1024,e.cx,3.05,u+He/2+.005,0),this.sign(b(t+1,s.label,"\u2191"),g,g*300/1024,e.cx,3.05,u-He/2-.005,Math.PI),this.endBatch(),this.target=o}reflectMats(){let e=this.mat;return[this.floorMat,e.frame,e.track,e.white,e.grey,e.pot,e.reveal]}probeSpot(e){let t=this.plan;if(!e){let i=t.hall;return{key:"hall",min:new P(i.x0,0,i.z0),max:new P(i.x1,i.h,i.z1),pos:new P(0,1.7,0)}}let n=e.sectionRef;return{key:n.i+"."+e.idx,room:e,min:new P(n.cx-_t/2,0,e.z1),max:new P(n.cx+_t/2,5,e.z0),pos:new P(n.cx,1.7,(e.z0+e.spine0)/2)}}setDetail(e){this.mat.ao.visible=!0,this.mat.shadow.visible=!0,this.mat.ao.opacity=e==="hd"?.08:.2;let t=e==="eco";this.level=e,t||this.needLTC(),this.applyLights(),this.hemiBase==null&&(this.hemiBase=this.hemi.intensity),this.hemi.intensity=this.hemiBase*(t?X_:1),this.eco=t,t?this.ecoSweep():this.ecoRestore()}applyLights(){let e=this.level!=="eco"&&!!this.ltcReady;this.areaLights.forEach(t=>{t.visible=e}),this.ecoLights.forEach(t=>{t.visible=!e})}needLTC(){return this.ltcReady?Promise.resolve(!0):(this.ltcJob||(this.ltcJob=lp(this.bridge.url("gallery-assets/ltc.bin")).then(()=>(this.ltcReady=!0,this.level&&this.setDetail(this.level),!0)),this.ltcJob.catch(e=>{this.ltcJob=null,window.console&&console.warn("[artgallery] \u043F\u043B\u043E\u0449\u0430\u0434\u043D\u044B\u0439 \u0441\u0432\u0435\u0442 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D:",e&&e.message)})),this.ltcJob)}ecoMat(e){this.ecoCache||(this.ecoCache=new Map);let t=this.ecoCache.get(e);return t||(t=new ls({map:e.map,color:e.color,emissive:e.emissive,emissiveMap:e.emissiveMap,emissiveIntensity:e.emissiveIntensity,aoMap:e.aoMap,aoMapIntensity:e.aoMapIntensity,alphaMap:e.alphaMap,alphaTest:e.alphaTest,transparent:e.transparent,opacity:e.opacity,side:e.side,vertexColors:e.vertexColors,fog:e.fog,depthWrite:e.depthWrite,depthTest:e.depthTest,toneMapped:e.toneMapped,polygonOffset:e.polygonOffset,polygonOffsetFactor:e.polygonOffsetFactor,polygonOffsetUnits:e.polygonOffsetUnits}),this.ecoCache.set(e,t),t)}ecoSweep(){let e=t=>Object.prototype.hasOwnProperty.call(t,"onBeforeCompile")&&!t.userData.probeOnly;this.scene.traverse(t=>{let n=t.material;!t.isMesh||!n||Array.isArray(n)||!n.isMeshStandardMaterial||e(n)||(t.userData.stdMat=n,t.material=this.ecoMat(n))})}ecoRestore(){this.scene.traverse(e=>{e.userData.stdMat&&(e.material=e.userData.stdMat,e.userData.stdMat=null)})}ao(e,t,n){if(!this.batch)return;let i=new pt,s=[e,t,[t[0]+n[0],t[1]+n[1],t[2]+n[2]],[e[0]+n[0],e[1]+n[1],e[2]+n[2]]];i.setAttribute("position",new Ye([].concat(...s),3)),i.setAttribute("normal",new Ye([0,1,0,0,1,0,0,1,0,0,1,0],3)),i.setAttribute("uv",new Ye([0,1,1,1,1,0,0,0],2)),i.setIndex([0,1,2,0,2,3]),this.push(this.mat.ao,i)}aoWallX(e,t,n,i,s){this.ao([e+i*.003,.003,t],[e+i*.003,.003,n],[i*.55,0,0]),this.ao([e+i*.003,0,t],[e+i*.003,0,n],[0,.4,0]),this.ao([e+i*.003,s,t],[e+i*.003,s,n],[0,-.7,0]),this.ao([e+i*.003,s-.003,t],[e+i*.003,s-.003,n],[i*.6,0,0])}aoWallZ(e,t,n,i,s){this.ao([t,.003,e+i*.003],[n,.003,e+i*.003],[0,0,i*.55]),this.ao([t,0,e+i*.003],[n,0,e+i*.003],[0,.4,0]),this.ao([t,s,e+i*.003],[n,s,e+i*.003],[0,-.7,0]),this.ao([t,s-.003,e+i*.003],[n,s-.003,e+i*.003],[0,0,i*.6])}setVisible(e,t,n,i){this.hallGroup.visible=e;let s=e;for(let a of this.plan.corridors){for(let o of a.rooms){let l=t.has(o);if(l&&this.ensureRoom(o),o.group&&(o.group.visible=l),l){let c=n&&n.get(o),h=!c||c[0]<=-1&&c[1]<=-1&&c[2]>=1&&c[3]>=1;for(let u of o.works){if(!u.mesh)continue;let d=!(u.dist>125);if(d&&!h){let f=u.x-u.side*.05;d=!!tu(c,W_(i,f,u))}u.mesh.visible=d}}l&&o.idx===0&&(s=!0)}a.parts.forEach((o,l)=>{o&&(o.visible=t.has(a.rooms[l])||t.has(a.rooms[l+1]))})}this.hallNorth.visible=s}plaque(e){let t=this.bridge.artists[e.gi],n=sn(512,256,(c,h,u)=>{c.fillStyle="#ffffff",c.fillRect(0,0,h,u);let d=e.work.title?e.work.title:"\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F",f,m;for(let v=1;v>=.62&&(f=Yn(c,t.name,h-48,{size:Math.round(32*v),min:Math.round(32*v),weight:600,maxLines:3}),m=Yn(c,d,h-48,{size:Math.round(29*v),min:Math.round(29*v),maxLines:4}),!(!f.cut&&!m.cut&&f.lines.length*f.size*1.18+10+m.lines.length*m.size*1.18<=u-70));v-=.04);c.fillStyle=hr,c.font="600 "+f.size+"px "+Ze;let b=22+f.size;f.lines.forEach(v=>{c.fillText(v,24,b),b+=f.size*1.18}),c.font="400 "+m.size+"px "+Ze,c.fillStyle="#55554f",b+=10-f.size*.18;let g=Math.max(1,Math.floor((u-58-b+m.size)/(m.size*1.18))),p=m.lines.length>g?Yn(c,d,h-48,{size:m.size,min:m.size,maxLines:g}).lines:m.lines;c.font="400 "+m.size+"px "+Ze,p.forEach(v=>{c.fillText(v,24,b),b+=m.size*1.18}),c.font="600 22px "+Ze;let _=c.measureText("\u041E \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0435 \u2192").width+30;c.fillStyle=nl,c.beginPath(),c.roundRect?c.roundRect(20,u-54,_,38,19):c.rect(20,u-54,_,38),c.fill(),c.fillStyle="#ffffff",c.fillText("\u041E \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0435 \u2192",35,u-28)}),i=new ls({map:bi(n,this.aniso)}),s=e.side<0?Math.PI/2:-Math.PI/2,a=e.side<0?-1:1,o=this.target;this.target=e.group;let l=this.plane(.38,.19,i,e.x-e.side*.006,1.3,e.z+a*(e.w/2+.38),s);return this.target=o,l.userData.plaque=e,this.pickables.push(l),l}banner(e){let t=this.bridge.artists[e.gi],n=Math.min(4.4,Math.max(1.8,e.z0-e.z1-.6)),i=240,s=sn(1024,i,(f,m)=>{f.fillStyle=hr,f.textAlign="center";let b=Yn(f,t.name,m-40,{size:62,min:46,weight:300,maxLines:1});b.cut&&(b=Yn(f,t.name,m-40,{size:50,min:34,weight:300,maxLines:2}));let g=b.size*1.12,p=b.lines.length>1?50:76;b.lines.forEach((S,y)=>f.fillText(S,m/2,p+y*g));let _=p+(b.lines.length-1)*g+52;f.font="400 28px "+Ze,f.fillStyle=_i;let v=t.city?t.city.toUpperCase():"",x="\u041E \u0425\u0423\u0414\u041E\u0416\u041D\u0418\u041A\u0415 \u2192";f.textAlign="center";let E=v?f.measureText(v).width+v.length*6:0;f.font="600 28px "+Ze;let w=f.measureText(x).width+x.length*4,T=v?44:0,I=(m-E-T-w)/2;v&&(f.font="400 28px "+Ze,f.fillStyle=_i,Xt(f,v,I+E/2,_,6),I+=E+T),f.font="600 28px "+Ze,f.fillStyle=nl,Xt(f,x,I+w/2,_,4)}),a=bi(s,this.aniso),o=new et({map:a,transparent:!0,toneMapped:!1}),l=(e.z0+e.z1)/2,c=n*i/1024,h=e.aisle,u=this.target;this.target=e.room.rooms[e.sub].group;let d=[this.plane(n,c,o,e.xWall-h*.006,3.35,l,h<0?Math.PI/2:-Math.PI/2),this.plane(n*.8,c*.8,o,e.xSpine+h*.006,3.3,l,h<0?-Math.PI/2:Math.PI/2)];return this.target=u,d.forEach(f=>{f.userData.banner=e,this.pickables.push(f)}),d}removeMesh(e){e.parent&&e.parent.remove(e);let t=this.pickables.indexOf(e);t>=0&&this.pickables.splice(t,1),e.material.map&&e.material.map.dispose(),e.material.dispose(),e.geometry.dispose()}update(e){let t=e.x,n=e.z;for(let i of this.paintings){let s=Math.hypot(i.x-t,i.z-n);i.dist=s;let a=this.plaques.get(i);!a&&s<N_?this.plaques.set(i,this.plaque(i)):a&&s>k_&&(this.removeMesh(a),this.plaques.delete(i))}for(let i of this.bays){if(!i.room.rooms[i.sub].group)continue;let s=Math.abs((i.z0+i.z1)/2-n)+Math.abs(i.xWall-t)*.5,a=this.banners.get(i);!a&&s<F_?this.banners.set(i,this.banner(i)):a&&s>O_&&(a[0].material.map.dispose(),a.forEach(o=>{o.parent&&o.parent.remove(o);let l=this.pickables.indexOf(o);l>=0&&this.pickables.splice(l,1),o.geometry.dispose()}),a[0].material.dispose(),this.banners.delete(i))}}};var cu=3.3,Y_=2.3,K_=1.9,pp=.55;function mp(r,e){let t=(e-r)%(Math.PI*2);return t>Math.PI&&(t-=Math.PI*2),t<-Math.PI&&(t+=Math.PI*2),t}var al=class{constructor(e){this.plan=e,this.x=(Math.random()*2-1)*1.4,this.z=e.hall.z1-2.2-Math.random()*.8,this.yaw=0,this.pitch=-.02,this.keys={},this.hold=0,this.joy={x:0,y:0},this.wheel=0,this.path=null,this.onArrive=null}get room(){return hs(this.plan,this.x,this.z)}moveTo(e,t){if(Bn(this.plan,e,t)){this.x=e,this.z=t;return}Bn(this.plan,e,this.z)?this.x=e:Bn(this.plan,this.x,t)&&(this.z=t)}cancel(){this.path=null,this.onArrive=null}goTo(e,t,n,i,s){let a=this.plan,o=[],l=this.room,c=hs(a,e,t),h=a.hall.z0,u=this.x,d=this.z;if(l>=0&&l!==c){let f=a.corridors[l];this.aislePath(o,f,u,d,f.cx,f.rooms[0].z0-1.6),o.push({x:f.cx,z:f.rooms[0].z0-1.6,fast:!0}),o.push({x:f.cx,z:h+1.6,fast:!0}),u=f.cx,d=h+1.6}if(c>=0&&l!==c){let f=a.corridors[c];o.push({x:f.cx,z:h+1.6,fast:!0}),o.push({x:f.cx,z:h-1.8,fast:!0}),u=f.cx,d=h-1.8}c>=0&&this.aislePath(o,a.corridors[c],u,d,e,t),o.push({x:e,z:t,yaw:n,pitch:i==null?-.02:i}),this.path=this.detour(this.x,this.z,o),this.onArrive=s||null}detour(e,t,n){let i=this.plan.block,s=.35,a=(h,u,d,f)=>{let m=Math.max(2,Math.ceil(Math.hypot(d-h,f-u)/.2));for(let b of i)for(let g=1;g<m;g++){let p=g/m,_=h+(d-h)*p,v=u+(f-u)*p;if(_>b.x0-s&&_<b.x1+s&&v>b.z0-s&&v<b.z1+s)return b}return null},o=[],l=e,c=t;for(let h of n){for(let u=0;u<4;u++){let d=a(l,c,h.x,h.z);if(!d)break;let f=s+.2,m=[[d.x0-f,d.z0-f],[d.x1+f,d.z0-f],[d.x0-f,d.z1+f],[d.x1+f,d.z1+f]],b=null,g=1/0;for(let[p,_]of m){if(!Bn(this.plan,p,_)||a(l,c,p,_)===d)continue;let v=Math.hypot(p-l,_-c)+Math.hypot(h.x-p,h.z-_);v<g&&(g=v,b=[p,_])}if(!b)break;o.push({x:b[0],z:b[1],fast:h.fast}),l=b[0],c=b[1]}o.push(h),l=h.x,c=h.z}return o}aislePath(e,t,n,i,s,a){let o=this.plan,l=jn(o,n,i),c=jn(o,s,a),h=p=>p<t.cx?-1:1,u=eu(o,n,i),d=eu(o,s,a);if(l===c&&Math.abs(a-i)<5&&(u||d||h(n)===h(s)))return;let f=h(u?s:n),m=d?f:h(s),b=qt(t,f),g=qt(t,m);if(e.push({x:b,z:i,fast:!0}),f!==m){let p=Math.abs(c.spine0-a)<Math.abs(c.spine1-a)?(c.spine0+c.z0)/2:(c.spine1+c.z1)/2;e.push({x:b,z:p,fast:!0}),e.push({x:g,z:p,fast:!0})}e.push({x:g,z:a,fast:!0})}update(e){let t=this.keys,n=0,i=0,s=0;(t.KeyW||t.ArrowUp)&&(n+=1),(t.KeyS||t.ArrowDown)&&(n-=1),t.KeyA&&(i-=1),t.KeyD&&(i+=1),(t.ArrowLeft||t.KeyQ)&&(s+=1),(t.ArrowRight||t.KeyE)&&(s-=1),n+=this.hold-this.joy.y,i+=this.joy.x;let a=t.ShiftLeft||t.ShiftRight?Y_:1;(n||i||s||Math.abs(this.wheel)>.01)&&this.cancel(),this.yaw+=s*K_*e;let o=0,l=0,c=Math.sin(this.yaw),h=Math.cos(this.yaw),u=n*cu*a+this.wheel;o+=-c*u+h*i*cu*a,l+=-h*u-c*i*cu*a,this.wheel*=Math.exp(-e*5),Math.abs(this.wheel)<.02&&(this.wheel=0),this.path?this.followPath(e):(o||l)&&this.moveTo(this.x+o*e,this.z+l*e)}followPath(e){let t=this.path[0],n=t.x-this.x,i=t.z-this.z,s=Math.hypot(n,i),a=this.path.length===1,o=s>.3?Math.atan2(-n,-i):this.yaw,l=a&&t.yaw!=null&&s<2.5?t.yaw:s>.3?o:this.yaw,c=1-Math.exp(-e*5);this.yaw+=mp(this.yaw,l)*c,a&&t.pitch!=null?this.pitch+=(t.pitch-this.pitch)*c:this.pitch+=(-.02-this.pitch)*c;let h=t.fast?26:16,u=Math.min(s,Math.max(1.2,Math.min(h,s*2.6))*e);if(s>1e-4&&(this.x+=n/s*u,this.z+=i/s*u),s<(a?.02:.5)&&(!a||t.yaw==null||Math.abs(mp(this.yaw,t.yaw))<.01)&&(this.path.shift(),!this.path.length)){this.path=null;let f=this.onArrive;this.onArrive=null,f&&f()}}look(e,t){this.yaw+=e,this.pitch=Math.max(-pp,Math.min(pp,this.pitch+t))}clampToPlan(e,t){for(let n=1;n>0;n-=.05){let i=this.x+(e-this.x)*n,s=this.z+(t-this.z)*n;if(Bn(this.plan,i,s))return{x:i,z:s}}return null}};var oa=1024*1024,ol=class{constructor(e,t,n,i){this.bridge=t,this.renderer=e,this.small=n,this.ready=[],this.uploadCap=(n?2:8)*oa,this.lean=!!i,this.aniso=Math.min(n?4:12,e.capabilities.getMaxAnisotropy()),this.active=0,this.limit=n?4:6,this.near=n?[0,7,32]:[3.2,10,45],this.budget=(i?50:n?110:300)*oa,this.bytes=0,this.fails=0,this.oks=0,this.corsChecked=!1,this.bitmaps=typeof createImageBitmap=="function"&&typeof fetch=="function",this.atlas=null,this.closed=!1,this.fetches=new Set,this.frustum=new ui,this.pv=new Te,this.stats={ticks:0,blankTicks:0,blankMax:0,loads:0,evictions:0,downgrades:0}}setQuality(e){let t=this.small||e==="eco";this.near=this.lean?[0,5,22]:t?[0,7,32]:[3.2,10,45]}levelFor(e){let[t,n,i]=this.near;return e<t?3:e<n?2:e<i?1:0}url(e,t){let n=t===3?e.full:t===2?e.medium:e.thumb;return n?this.bridge.url(n):""}prefetchAtlas(){if(this.pre)return this.pre;let e=this.fetchT(this.bridge.url("atlas.json"),n=>{if(!n.ok)throw new Error("atlas.json: "+n.status);return n.json()},0),t=e.then(n=>{let i=this.lean&&n.size?Math.round(n.size/2):0,s=i&&Array.isArray(n.half)&&n.half.length===n.pages.length?n.half:null;return n.pages.map((a,o)=>{let l=s?this.fetchImage(this.bridge.url(s[o]),0,0).catch(()=>this.fetchImage(this.bridge.url(a),i,0)):this.fetchImage(this.bridge.url(a),i,0);return l.catch(()=>{}),l})});return e.catch(()=>{}),t.catch(()=>{}),this.pre={json:e,pages:t}}loadAtlas(e,t){let n=(s,a)=>{t&&t(s,a)},i=this.prefetchAtlas();return i.json.then(s=>i.pages.then(a=>{if(this.closed)return;this.plan=e,this.atlas={json:s,pages:[],failed:{}};for(let l of e)l.cell=s.items[l.work.thumb]||null;let o=0;return n(0,s.pages.length),Promise.all(a.map((l,c)=>l.then(h=>{if(this.closed){h.close&&h.close();return}let u=this.makeTexture(h);this.atlas.pages[c]=u;for(let d of this.plan)d.cell&&d.cell[0]===c&&!d.level&&!d.mesh.material.map&&this.toAtlas(d);n(++o,s.pages.length)}).catch(()=>{let h=s.pages[c];if(!this.closed){this.atlas.failed[c]=!0;for(let u of this.plan)u.cell&&u.cell[0]===c&&(u.cell=null);window.console&&console.warn("[artgallery] \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0430\u0442\u043B\u0430\u0441\u0430 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0430\u0441\u044C:",h)}n(++o,s.pages.length)})))})).catch(()=>{this.atlas=null,n(1,1)})}attach(e){if(this.atlas)for(let t of e)t.cell=this.atlas.json.items[t.work.thumb]||null,t.cell&&this.atlas.failed[t.cell[0]]&&(t.cell=null),t.mesh.material.map||this.toAtlas(t)}toAtlas(e){let t=this.atlas&&e.cell&&this.atlas.pages[e.cell[0]];if(!t)return!1;let n=t.source.version,i=t.clone();i.source.version=n;let s=this.atlas.json.size,[,a,o,l,c]=e.cell;return this.setUV(i,(a+.5)/s,(o+.5)/s,(a+l-.5)/s,(o+c-.5)/s),this.swap(e,i,0,0),!0}fetchT(e,t,n=2e4){if(typeof AbortController!="function")return fetch(e,{mode:"cors",credentials:"omit"}).then(t);let i=new AbortController,s=n?setTimeout(()=>i.abort(),n):0;this.fetches.add(i);let a=()=>{clearTimeout(s),this.fetches.delete(i)};return fetch(e,{mode:"cors",credentials:"omit",signal:i.signal}).then(t).then(o=>(a(),o),o=>{throw a(),o})}close(){this.closed=!0,this.fetches.forEach(e=>e.abort()),this.fetches.clear();for(let e of this.ready)e.img.close&&e.img.close();if(this.ready=[],this.atlas)for(let e of this.atlas.pages)e&&(e.image&&e.image.close&&e.image.close(),e.dispose())}fetchImage(e,t,n){return this.closed?Promise.reject(new Error("closed")):this.bitmaps?this.fetchT(e,i=>{if(!i.ok)throw new Error(i.status);return i.blob()},n).then(i=>createImageBitmap(i,Object.assign({premultiplyAlpha:"none",colorSpaceConversion:"none"},t?{resizeWidth:t,resizeQuality:"high"}:{}))).catch(i=>{if(!this.closed&&/\.webp(\?|$)/.test(e))return this.fetchImage(e.replace(/\.webp(\?|$)/,".jpg$1"),t,n);throw i}):new Promise((i,s)=>{let a=new Image;a.crossOrigin="anonymous",a.decoding="async";let o=!1;a.onload=()=>i(a),a.onerror=()=>{if(!o&&/\.webp(\?|$)/.test(e)){o=!0,a.src=e.replace(/\.webp(\?|$)/,".jpg$1");return}s(new Error("image"))},a.src=e})}makeTexture(e){let t=new St(e),n=typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap;t.colorSpace=je,t.anisotropy=this.aniso,t.generateMipmaps=!0,t.minFilter=yn,t.flipY=!n,t.userData.topDown=n,t.needsUpdate=!0;let i=e.width,s=e.height;return t.userData.bytes=Math.round(i*s*4*1.34),t.onUpdate=()=>{n&&e.close&&e.close(),t.image={width:i,height:s}},t}setUV(e,t,n,i,s){e.userData.topDown?(e.repeat.set(i-t,n-s),e.offset.set(t,s)):(e.repeat.set(i-t,s-n),e.offset.set(t,1-s))}swap(e,t,n,i){let s=e.mesh.material,a=s.map,o=!a;s.map=t,s.color.setHex(16777215),o&&(s.needsUpdate=!0),a&&a.dispose(),this.bytes+=i-(e.bytes||0),e.bytes=i,e.level=n}load(e,t){let n=this.url(e.work,t);if(!n){(e.failed=e.failed||{})[t]=!0;return}e.loading=t,this.active++,this.stats.loads++,this.fetchImage(n).then(i=>{if(this.closed){i.close&&i.close();return}this.active--,e.loading=0,this.oks++,e.queued=t,this.ready.push({it:e,img:i,level:t})},()=>{this.closed||(this.active--,e.loading=0,(e.failed=e.failed||{})[t]=!0,this.fails++,this.checkCors(n))})}flush(){if(this.closed||!this.ready.length)return;this.ready.length>1&&this.ready.sort((t,n)=>(t.it.dist||0)-(n.it.dist||0));let e=0;for(;this.ready.length;){let{it:t,img:n,level:i}=this.ready[0],s=Math.round(n.width*n.height*4*1.34);if(e&&e+s>this.uploadCap)break;if(this.ready.shift(),t.queued===i&&(t.queued=0),i<t.want&&i<=t.level||i===t.level){n.close&&n.close();continue}let a=this.makeTexture(n);this.setUV(a,0,0,1,1),this.renderer.initTexture(a),this.swap(t,a,i,a.userData.bytes),e+=s}}update(e,t){this.plan=e;let n=performance.now();t.updateMatrixWorld(),this.pv.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.pv);let i=[],s=0;for(let a of e){if(a.dist==null)continue;let o=a.mesh.visible&&this.frustum.intersectsObject(a.mesh);o&&(a.seen=n,!a.mesh.material.map&&a.dist<60&&!this.hopeless(a)&&s++);let l=this.levelFor(a.dist);for(a.group&&!a.group.visible&&(l=Math.min(l,1)),l<a.level&&(l=Math.min(a.level,this.levelFor(a.dist/1.45)),l===0&&!a.cell&&a.dist<125&&(l=1));l>0&&a.failed&&a.failed[l];)l--;a.want=l,l===0&&a.level>0&&a.cell&&this.atlas?this.toAtlas(a)&&this.stats.downgrades++:l!==a.level&&a.loading!==l&&a.queued!==l&&!(l===0&&!a.cell)&&(a.score=a.dist*(o?.6:1.5)+(l<a.level?a.level===3?0:60:0),i.push(a))}if(this.stats.ticks++,s&&this.stats.blankTicks++,this.stats.blankMax=Math.max(this.stats.blankMax,s),this.enforceBudget(n),!!i.length){i.sort((a,o)=>a.score-o.score);for(let a of i){if(this.active>=this.limit)break;a.loading||a.queued||a.want>a.level&&this.bytes>this.budget*.92&&a.want>1||this.load(a,a.want)}}}hopeless(e){return!e.cell&&e.failed&&e.failed[1]&&e.failed[2]&&e.failed[3]}enforceBudget(e){if(this.bytes<=this.budget||!this.atlas)return;let t=[];for(let n of this.plan||[])n.level>0&&n.cell&&t.push(n);t.sort((n,i)=>(n.seen||0)-(i.seen||0));for(let n of t){if(this.bytes<=this.budget*.85||e-(n.seen||0)<500)break;this.toAtlas(n)&&this.stats.evictions++}}resetStats(){this.stats={ticks:0,blankTicks:0,blankMax:0,loads:0,evictions:0,downgrades:0}}report(){let e=[0,0,0,0],t=0;for(let n of this.plan||[])e[n.level]++,n.mesh.material.map||t++;return Object.assign({gpuMB:+(this.bytes/oa).toFixed(1),budgetMB:this.budget/oa,byLevel:e,noImage:t,atlasPages:this.atlas?this.atlas.pages.filter(Boolean).length:0,atlasMB:this.atlas?+(this.atlas.pages.filter(Boolean).reduce((n,i)=>n+(i.userData.bytes||0),0)/oa).toFixed(1):0},this.stats)}checkCors(e){if(this.corsChecked||this.oks>0||this.fails<3)return;this.corsChecked=!0;let t=new Image;t.onload=()=>{this.oks===0&&this.bridge.fallback&&this.bridge.fallback("cors")},t.src=e.replace(/\.webp(\?|$)/,".jpg$1")}};var Gi={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var ln=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Z_=new Ni(-1,1,1,-1,0,1),hu=class extends pt{constructor(){super(),this.setAttribute("position",new Ye([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ye([0,2,0,0,2,0],2))}},J_=new hu,Kn=class{constructor(e){this._mesh=new Ne(J_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Z_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Wi=class extends ln{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof st?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=un.clone(e.uniforms),this.material=new st({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Kn(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var la=class extends ln{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}},ll=class extends ln{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var cl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new G);this._width=n.width,this._height=n.height,t=new Ct(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Pt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Wi(Gi),this.copyPass.material.blending=kt,this.clock=new zo}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,s=this.passes.length;i<s;i++){let a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}la!==void 0&&(a instanceof la?n=!0:a instanceof ll&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new G);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var hl=class extends ln{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new fe}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}};var ca={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new G},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Te},cameraProjectionMatrixInverse:{value:new Te},cameraWorldMatrix:{value:new Te},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new P(-1,-1,-1)},sceneBoxMax:{value:new P(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},ha={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},ul={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function gp(r=5){let e=Math.floor(r)%2===0?Math.floor(r)+1:Math.floor(r),t=Q_(e),n=t.length,i=new Uint8Array(n*4);for(let a=0;a<n;++a){let o=t[a],l=2*Math.PI*o/n,c=new P(Math.cos(l),Math.sin(l),0).normalize();i[a*4]=(c.x*.5+.5)*255,i[a*4+1]=(c.y*.5+.5)*255,i[a*4+2]=127,i[a*4+3]=255}let s=new Sn(i,e,e);return s.wrapS=Qt,s.wrapT=Qt,s.needsUpdate=!0,s}function Q_(r){let e=Math.floor(r)%2===0?Math.floor(r)+1:Math.floor(r),t=e*e,n=Array(t).fill(0),i=Math.floor(e/2),s=e-1;for(let a=1;a<=t;){if(i===-1&&s===e?(s=e-2,i=0):(s===e&&(s=0),i<0&&(i=e-1)),n[i*e+s]!==0){s-=2,i++;continue}else n[i*e+s]=a++;s++,i--}return n}var ua={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:uu(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new G},cameraProjectionMatrixInverse:{value:new Te},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function uu(r,e,t){let n=$_(r,e,t),i="vec3[SAMPLES](";for(let s=0;s<r;s++){let a=n[s];i+=`vec3(${a.x}, ${a.y}, ${a.z})${s<r-1?",":")"}`}return i}function $_(r,e,t){let n=[];for(let i=0;i<r;i++){let s=2*Math.PI*e*i/r,a=Math.pow(i/(r-1),t);n.push(new P(Math.cos(s),Math.sin(s),a))}return n}var dl=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,n){return e[0]*t+e[1]*n}dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}dot4(e,t,n,i,s){return e[0]*t+e[1]*n+e[2]*i+e[3]*s}noise(e,t){let n,i,s,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,d=l-u,f=c-u,m=e-d,b=t-f,g,p;m>b?(g=1,p=0):(g=0,p=1);let _=m-g+h,v=b-p+h,x=m-1+2*h,E=b-1+2*h,w=l&255,T=c&255,I=this.perm[w+this.perm[T]]%12,S=this.perm[w+g+this.perm[T+p]]%12,y=this.perm[w+1+this.perm[T+1]]%12,R=.5-m*m-b*b;R<0?n=0:(R*=R,n=R*R*this.dot(this.grad3[I],m,b));let F=.5-_*_-v*v;F<0?i=0:(F*=F,i=F*F*this.dot(this.grad3[S],_,v));let k=.5-x*x-E*E;return k<0?s=0:(k*=k,s=k*k*this.dot(this.grad3[y],x,E)),70*(n+i+s)}noise3d(e,t,n){let i,s,a,o,c=(e+t+n)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),d=Math.floor(n+c),f=1/6,m=(h+u+d)*f,b=h-m,g=u-m,p=d-m,_=e-b,v=t-g,x=n-p,E,w,T,I,S,y;_>=v?v>=x?(E=1,w=0,T=0,I=1,S=1,y=0):_>=x?(E=1,w=0,T=0,I=1,S=0,y=1):(E=0,w=0,T=1,I=1,S=0,y=1):v<x?(E=0,w=0,T=1,I=0,S=1,y=1):_<x?(E=0,w=1,T=0,I=0,S=1,y=1):(E=0,w=1,T=0,I=1,S=1,y=0);let R=_-E+f,F=v-w+f,k=x-T+f,O=_-I+2*f,K=v-S+2*f,V=x-y+2*f,$=_-1+3*f,W=v-1+3*f,ee=x-1+3*f,oe=h&255,pe=u&255,De=d&255,Xe=this.perm[oe+this.perm[pe+this.perm[De]]]%12,X=this.perm[oe+E+this.perm[pe+w+this.perm[De+T]]]%12,te=this.perm[oe+I+this.perm[pe+S+this.perm[De+y]]]%12,de=this.perm[oe+1+this.perm[pe+1+this.perm[De+1]]]%12,se=.6-_*_-v*v-x*x;se<0?i=0:(se*=se,i=se*se*this.dot3(this.grad3[Xe],_,v,x));let Se=.6-R*R-F*F-k*k;Se<0?s=0:(Se*=Se,s=Se*Se*this.dot3(this.grad3[X],R,F,k));let Pe=.6-O*O-K*K-V*V;Pe<0?a=0:(Pe*=Pe,a=Pe*Pe*this.dot3(this.grad3[te],O,K,V));let Ie=.6-$*$-W*W-ee*ee;return Ie<0?o=0:(Ie*=Ie,o=Ie*Ie*this.dot3(this.grad3[de],$,W,ee)),32*(i+s+a+o)}noise4d(e,t,n,i){let s=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,u,d,f,m,b=(e+t+n+i)*l,g=Math.floor(e+b),p=Math.floor(t+b),_=Math.floor(n+b),v=Math.floor(i+b),x=(g+p+_+v)*c,E=g-x,w=p-x,T=_-x,I=v-x,S=e-E,y=t-w,R=n-T,F=i-I,k=S>y?32:0,O=S>R?16:0,K=y>R?8:0,V=S>F?4:0,$=y>F?2:0,W=R>F?1:0,ee=k+O+K+V+$+W,oe=a[ee][0]>=3?1:0,pe=a[ee][1]>=3?1:0,De=a[ee][2]>=3?1:0,Xe=a[ee][3]>=3?1:0,X=a[ee][0]>=2?1:0,te=a[ee][1]>=2?1:0,de=a[ee][2]>=2?1:0,se=a[ee][3]>=2?1:0,Se=a[ee][0]>=1?1:0,Pe=a[ee][1]>=1?1:0,Ie=a[ee][2]>=1?1:0,Qe=a[ee][3]>=1?1:0,Z=S-oe+c,re=y-pe+c,L=R-De+c,Ee=F-Xe+c,ne=S-X+2*c,ve=y-te+2*c,le=R-de+2*c,Ue=F-se+2*c,ge=S-Se+3*c,C=y-Pe+3*c,M=R-Ie+3*c,B=F-Qe+3*c,j=S-1+4*c,Q=y-1+4*c,Y=R-1+4*c,we=F-1+4*c,he=g&255,me=p&255,Ve=_&255,ie=v&255,ye=o[he+o[me+o[Ve+o[ie]]]]%32,ke=o[he+oe+o[me+pe+o[Ve+De+o[ie+Xe]]]]%32,Fe=o[he+X+o[me+te+o[Ve+de+o[ie+se]]]]%32,Me=o[he+Se+o[me+Pe+o[Ve+Ie+o[ie+Qe]]]]%32,$e=o[he+1+o[me+1+o[Ve+1+o[ie+1]]]]%32,Oe=.6-S*S-y*y-R*R-F*F;Oe<0?h=0:(Oe*=Oe,h=Oe*Oe*this.dot4(s[ye],S,y,R,F));let nt=.6-Z*Z-re*re-L*L-Ee*Ee;nt<0?u=0:(nt*=nt,u=nt*nt*this.dot4(s[ke],Z,re,L,Ee));let D=.6-ne*ne-ve*ve-le*le-Ue*Ue;D<0?d=0:(D*=D,d=D*D*this.dot4(s[Fe],ne,ve,le,Ue));let ue=.6-ge*ge-C*C-M*M-B*B;ue<0?f=0:(ue*=ue,f=ue*ue*this.dot4(s[Me],ge,C,M,B));let q=.6-j*j-Q*Q-Y*Y-we*we;return q<0?m=0:(q*=q,m=q*q*this.dot4(s[$e],j,Q,Y,we)),27*(h+u+d+f+m)}};var da=class r extends ln{constructor(e,t,n,i,s,a,o){super(),this.width=n!==void 0?n:512,this.height=i!==void 0?i:512,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=gp(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Ct(this.width,this.height,{type:Pt}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new st({defines:Object.assign({},ca.defines),uniforms:un.clone(ca.uniforms),vertexShader:ca.vertexShader,fragmentShader:ca.fragmentShader,blending:kt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Uo,this.normalMaterial.blending=kt,this.pdMaterial=new st({defines:Object.assign({},ua.defines),uniforms:un.clone(ua.uniforms),vertexShader:ua.vertexShader,fragmentShader:ua.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new st({defines:Object.assign({},ha.defines),uniforms:un.clone(ha.uniforms),vertexShader:ha.vertexShader,fragmentShader:ha.fragmentShader,blending:kt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new st({uniforms:un.clone(Gi.uniforms),vertexShader:Gi.vertexShader,fragmentShader:Gi.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Wo,blendDst:rr,blendEquation:vn,blendSrcAlpha:Go,blendDstAlpha:rr,blendEquationAlpha:vn}),this.blendMaterial=new st({uniforms:un.clone(ul.uniforms),vertexShader:ul.vertexShader,fragmentShader:ul.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Lh,blendSrc:Wo,blendDst:rr,blendEquation:vn,blendSrcAlpha:Go,blendDstAlpha:rr,blendEquationAlpha:vn}),this.fsQuad=new Kn(null),this.originalClearColor=new fe,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new Ks,this.depthTexture.format=Ui,this.depthTexture.type=Di,this.normalRenderTarget=new Ct(this.width,this.height,{minFilter:Rt,magFilter:Rt,type:Pt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=uu(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case r.OUTPUT.Off:break;case r.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=kt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case r.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=kt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case r.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=kt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case r.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case r.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=kt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case r.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=kt,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,t,n,i,s){e.getClearColor(this.originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(s||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=o,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}renderOverride(e,t,n,i,s){e.getClearColor(this.originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,s=t.clearAlpha||s,i!=null&&(e.setClearColor(i),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){t.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){let i=t.get(n);n.visible=i}),t.clear()}generateNoise(e=64){let t=new dl,n=e*e*4,i=new Uint8Array(n);for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=a,c=o;i[(a*e+o)*4]=(t.noise(l,c)*.5+.5)*255,i[(a*e+o)*4+1]=(t.noise(l+e,c)*.5+.5)*255,i[(a*e+o)*4+2]=(t.noise(l,c+e)*.5+.5)*255,i[(a*e+o)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}let s=new Sn(i,e,e,Zt,Fn);return s.wrapS=Qt,s.wrapT=Qt,s.needsUpdate=!0,s}};da.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var xp={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var fl=class extends ln{constructor(){super();let e=xp;this.uniforms=un.clone(e.uniforms),this.material=new Do({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Kn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ke.getTransfer(this._outputColorSpace)===ot&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Uh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Nh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===kh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Fh?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Oh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ia&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var bp={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new fe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var dr=class r extends ln{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new G(e.x,e.y):new G(256,256),this.clearColor=new fe(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ct(s,a,{type:Pt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new Ct(s,a,{type:Pt});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let f=new Ct(s,a,{type:Pt});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),a=Math.round(a/2)}let o=bp;this.highPassUniforms=un.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new st({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new G(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=Gi;this.copyUniforms=un.clone(h.uniforms),this.blendMaterial=new st({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:is,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new fe,this.oldClearAlpha=1,this.basic=new et,this.fsQuad=new Kn(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new G(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=r.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=r.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new st({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new G(.5,.5)},direction:{value:new G(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new st({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};dr.BlurDirectionX=new G(1,0);dr.BlurDirectionY=new G(0,1);var vp={uniforms:{tDiffuse:{value:null}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform sampler2D tDiffuse; varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      if (any(isnan(c)) || any(isinf(c)) || c.r != c.r || c.g != c.g || c.b != c.b) c = vec4(0.0, 0.0, 0.0, 1.0);
      gl_FragColor = clamp(c, 0.0, 64.0);
    }`},ey={uniforms:{tDiffuse:{value:null},time:{value:0},grain:{value:.035},vignette:{value:.28}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform float time; uniform float grain; uniform float vignette; varying vec2 vUv;
    float rnd(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + time * 7.13) * 43758.5453); }
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 d = vUv - 0.5;
      c.rgb *= 1.0 - vignette * smoothstep(0.25, 0.85, dot(d, d) * 2.2);
      float n = rnd(vUv * 1024.0) - 0.5;
      float l = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      c.rgb += n * grain * (1.0 - l * 0.6);          // \u0432 \u0442\u0435\u043D\u044F\u0445 \u0437\u0435\u0440\u043D\u043E \u0437\u0430\u043C\u0435\u0442\u043D\u0435\u0435, \u043A\u0430\u043A \u0443 \u043F\u043B\u0451\u043D\u043A\u0438
      gl_FragColor = c;
    }`};var du={auto:"\u0410\u0432\u0442\u043E",hd:"HD",sd:"SD",eco:"\u042D\u043A\u043E\u043D\u043E\u043C"},_p="artg-quality",ty={high:"hd",medium:"sd",low:"sd"},ny=60,iy=30,pl=class{constructor(e){this.g=e;let t="";try{t=localStorage.getItem(_p)||""}catch{}t=ty[t]||t,this.mode=du[t]?t:"auto",this.level=null,this.frames=[],this.skip=0,this.still=0,this.rest=!1,this.onChange=null,this.budget=e.small?33:22,this.set(this.mode==="auto"?this.autoLevel():this.mode)}autoLevel(){return this.g.weak?"eco":"sd"}choose(e){this.mode=e;try{localStorage.setItem(_p,e)}catch{}this.set(e==="auto"?this.autoLevel():e)}set(e){let t=this.g,n=e==="hd",i=e==="eco";this.level=e,this.frames.length=0,this.skip=30,this.rest=!1,this.still=0;let s=window.devicePixelRatio||1;t.maxPR=Math.min(s,i?1:t.weak?1.25:n||t.small?2:1.5),t.minPR=Math.min(t.maxPR,i?.5:t.weak?.6:t.small?1:.75),this.ceil=t.maxPR,this.work=i?Math.min(t.maxPR,t.weak?.75:1):t.weak?Math.min(t.maxPR,1):t.small?Math.min(t.maxPR,1.5):t.maxPR,this.stuck=0,this.levelAt=performance.now(),this.heavy=0,this.good=0,this.nextPR=null,this.applyPR(this.work),n?this.makeComposer():this.dropComposer(),t.world.setDetail(e),t.spots&&(t.spots.setShadows(n),t.spots.setActive(i?4:t.spots.n)),t.probe&&(t.probeOff==null&&(t.probeOff=t.probe.off),t.probe.off=i||t.probeOff),t.peers&&(t.peers.amax=i?0:t.light?4:8);let a=!i&&(n||!t.light);t.atmo&&t.atmo.setEnabled(a),t.world&&t.world.invTM&&(t.world.invTM.value=n?1:0),t.props&&t.props.screenLight&&(t.props.screenLight.visible=a),t.tex.setQuality(e),this.onChange&&this.onChange()}applyPR(e){let t=this.g;t.pr===e&&t.renderer.getPixelRatio()===e||(t.pr=e,t.renderer.setPixelRatio(e),t.resize())}makeComposer(){let e=this.g;if(this.composer)return;let t=e.renderer.getDrawingBufferSize(new G),n=new Ct(t.x,t.y,{type:Pt,samples:4}),i=new cl(e.renderer,n);i.addPass(new hl(e.scene,e.camera)),i.addPass(new Wi(vp));let s=new da(e.scene,e.camera,t.x,t.y);s.updateGtaoMaterial({radius:.45,distanceExponent:1.5,thickness:1,scale:1,samples:12}),s.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,rings:2,samples:12}),s.blendIntensity=.55;let a=s.overrideVisibility.bind(s),o=[];s.overrideVisibility=()=>{a(),o=[],e.scene.traverse(h=>{h.userData.noAO&&(h.userData.aoCutout&&h.visible&&h.material.visible&&o.push(h),h.visible=!1)})};let l=s.renderOverride.bind(s);s.renderOverride=(h,u,d,f,m)=>{if(l(h,u,d,f,m),u!==s.normalMaterial||!o.length)return;let b=h.autoClear;h.setRenderTarget(d),h.autoClear=!1;for(let g of o){let p=g.material;g.visible=!0,g.material=g.userData.aoCutout,h.render(g,e.camera),g.material=p,g.visible=!1}h.autoClear=b},i.addPass(s),i.addPass(new Wi(vp));let c=new dr(new G(t.x,t.y),.45,.45,2.2);i.addPass(c),i.addPass(new fl),this.film=new Wi(ey),i.addPass(this.film),this.composer=i,this.ao=s}dropComposer(){this.composer&&(this.composer.passes.forEach(e=>e.dispose&&e.dispose()),this.composer.dispose(),this.composer=null,this.ao=null)}resize(e,t){this.composer&&(this.composer.setPixelRatio(this.g.pr),this.composer.setSize(e,t))}deferPR(e){this.nextPR=e}render(){let e=this.g;this.nextPR!=null&&(this.applyPR(this.nextPR),this.nextPR=null),this.composer?(this.film&&(this.film.uniforms.time.value=performance.now()/1e3%100),this.composer.render()):e.renderer.render(e.scene,e.camera)}down(e,t){let n=this.g;if(this.mode==="auto"&&this.level==="hd"){this.noHD=!0,this.set("sd");return}if(this.work<=n.minPR){if(this.mode==="auto"&&this.level==="sd"){this.set("eco");return}let i=e||t>90;this.level==="eco"&&i&&performance.now()-this.levelAt>8e3&&++this.stuck>=2&&n.offerSimple&&n.offerSimple();return}if(this.work>n.minPR){let i=e?.5:.25;this.ceil=Math.min(this.ceil,this.work-i),this.ceilAt=performance.now(),this.work=Math.max(n.minPR,this.work-i),this.deferPR(this.work),this.frames.length=0,this.skip=10}}upgrade(){let e=this.g,t=e.renderer;if(this.upgrading||!t.compileAsync){t.compileAsync||this.set("hd");return}this.upgrading=!0;let n=new Ct(4,4,{type:Pt}),i=t.getRenderTarget(),s;try{t.setRenderTarget(n),s=t.compileAsync(e.scene,e.camera)}finally{t.setRenderTarget(i)}s.then(()=>{n.dispose(),this.upgrading=!1,this.mode==="auto"&&this.level==="sd"&&!this.noHD&&!e.dead&&this.set("hd")},()=>{n.dispose(),this.upgrading=!1,this.noHD=!0})}frame(e,t){let n=this.g;if(t){if(this.still=0,this.rest){this.rest=!1,this.deferPR(this.work),this.frames.length=0,this.skip=10;return}}else if(++this.still===iy&&this.level==="sd"&&n.pr<n.maxPR&&(this.rest=!0,this.deferPR(n.maxPR)),this.rest)return;if(e>Math.max(100,this.budget*4)){if(++this.heavy>=4){this.heavy=0,this.down(!0);return}}else this.heavy=0;if(this.skip>0){this.skip--;return}if(this.frames.push(e),this.frames.length<ny)return;let i=this.frames.slice().sort((a,o)=>a-o),s=i[i.length>>1];if(this.frames.length=0,s>this.budget*1.08)this.good=0,this.down(!1,s);else if(this.mode==="auto"&&this.level==="sd"&&!n.light&&!this.noHD&&this.work>=n.maxPR&&s<this.budget*.45)++this.good>=2&&(this.good=0,this.upgrade());else if(s<this.budget*.62){if(performance.now()-(this.ceilAt||0)>2e4&&(this.ceil=n.maxPR),this.work+.25>this.ceil)return;this.work+=.25,this.deferPR(this.work),this.skip=20}}};var ry=5.5,ay=3800,oy=900;function ml(r){return String(r==null?"":r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ly(r){let e=[];return r.bays.forEach((t,n)=>{let i=t.aisle<0?-1:1,s=r.works.filter(a=>a.gi===t.gi&&a.aisle===t.aisle);[t.xWall,t.xSpine].forEach(a=>{let o=s.filter(h=>Math.abs(h.x-a)<.01).sort((h,u)=>i*(h.z-u.z)),l=[],c=()=>{if(!l.length)return;let h=Math.min(...l.map(m=>m.z-m.w/2)),u=Math.max(...l.map(m=>m.z+m.w/2)),d=l[0],f=Math.min(7.2-.8,Math.max(3.2,(u-h)*.75+1.4));e.push({bay:t,bi:n,works:l,x:d.x-d.side*f,z:(h+u)/2,yaw:d.side<0?Math.PI/2:-Math.PI/2}),l=[]};o.forEach(h=>{let u=l.concat([h]),d=Math.max(...u.map(f=>f.z+f.w/2))-Math.min(...u.map(f=>f.z-f.w/2));l.length&&d>ry&&c(),l.push(h)}),c()})}),e}var gl=class{constructor(e){this.g=e,this.el=e.stage.querySelector(".artg-tour"),this.running=!1,this.el.addEventListener("click",t=>{let n=t.target.closest("[data-t]");if(!n)return;let i=n.getAttribute("data-t");i==="next"?this.go(this.i+1):i==="prev"?this.go(Math.max(0,this.i-1)):i==="stop"?this.stop():i==="hall"?(this.stop(),e.goHall()):/^sec/.test(i)&&this.start(+i.slice(3),!0)}),["pointerdown","wheel"].forEach(t=>this.el.addEventListener(t,n=>n.stopPropagation()))}start(e,t){let n=this.g,i=n.plan.corridors[e];if(!i||(this.c=i,this.stops=ly(i),!this.stops.length))return;let s=0;if(!t&&n.room===e){let a=1/0;this.stops.forEach((o,l)=>{let c=Math.hypot(o.x-n.nav.x,o.z-n.nav.z);c<a&&(a=c,s=l)})}this.running=!0,n.stage.classList.add("is-touring"),n.focus=null,this.go(s)}go(e){let t=this.g;if(clearTimeout(this.timer),!this.running)return;if(e>=this.stops.length){this.finish();return}this.i=e;let n=this.stops[e];this.caption(n),t.travel(n.x,n.z,n.yaw,0,()=>this.dwell(n))}dwell(e){clearTimeout(this.timer);let t=()=>{if(this.running){if(this.g.modalOpen()){this.timer=setTimeout(t,500);return}this.go(this.i+1)}};this.timer=setTimeout(t,ay+oy*(e.works.length-1))}caption(e){let t=this.g.bridge.artists[e.bay.gi],n=this.c.bays.length;this.el.innerHTML='<div class="artg-tour__txt"><b>'+ml(t.name)+"</b><span>"+(t.city?ml(t.city)+" \xB7 ":"")+"\u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A "+(e.bi+1)+" \u0438\u0437 "+n+'</span></div><div class="artg-tour__btns"><button type="button" data-t="prev" aria-label="\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430">\u2039</button><button type="button" data-t="next" aria-label="\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430">\u203A</button><button type="button" data-t="stop" class="artg-tour__stop">\u0421\u0442\u043E\u043F</button></div>',this.el.hidden=!1}finish(){let e=this.g;this.running=!1,clearTimeout(this.timer),e.stage.classList.remove("is-touring");let t=e.plan.corridors.filter(n=>n!==this.c);this.el.innerHTML='<div class="artg-tour__txt"><b>\u0420\u0430\u0437\u0434\u0435\u043B \xAB'+ml(this.c.title||"\u042D\u043A\u0441\u043F\u043E\u0437\u0438\u0446\u0438\u044F")+'\xBB \u043F\u0440\u043E\u0439\u0434\u0435\u043D</b><span>\u0421\u043F\u0430\u0441\u0438\u0431\u043E, \u0447\u0442\u043E \u043F\u0440\u043E\u0448\u043B\u0438 \u0435\u0433\u043E \u0446\u0435\u043B\u0438\u043A\u043E\u043C</span></div><div class="artg-tour__btns">'+t.map(n=>'<button type="button" data-t="sec'+n.i+'" class="artg-tour__wide">\u042D\u043A\u0441\u043A\u0443\u0440\u0441\u0438\u044F: '+ml(n.title||"")+"</button>").join("")+'<button type="button" data-t="hall" class="artg-tour__wide">\u0412 \u0445\u043E\u043B\u043B</button><button type="button" data-t="stop" aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C">\u2715</button></div>',this.el.hidden=!1}stop(){let e=this.g,t=this.running;this.running=!1,clearTimeout(this.timer),this.el.hidden=!0,e.stage.classList.remove("is-touring"),t&&e.nav.cancel()}};var cy=1.55,hy=24,uy=3.5,xl=class{constructor(e,t){this.n=t?6:16,this.shadowN=t?0:4,this.shadows=!t,this.power=75,this.active=this.n,this.pool=[];for(let n=0;n<this.n;n++){let i=new ir(16774632,0,9,.38,.9,2);i.target=new gt,n<this.shadowN&&(i.castShadow=!0,i.shadow.mapSize.set(1024,1024),i.shadow.bias=-6e-4,i.shadow.normalBias=.02,i.shadow.radius=4,i.shadow.camera.near=.4,i.shadow.camera.far=8),e.add(i,i.target),this.pool.push({l:i,it:null,cur:0,next:null})}this.tmp=new P,this.factor=null,this.dim=1}setActive(e){this.active=Math.min(e,this.n),this.pool.forEach((t,n)=>{let i=n<this.active;t.l.visible=i,i||(t.it=null,t.next=void 0,t.cur=0,t.l.intensity=0)})}setShadows(e){this.shadows=e,this.pool.forEach((t,n)=>{t.l.castShadow=e&&n<this.shadowN}),this.moved=!0}place(e,t){e.it=t,this.moved=!0,e.l.position.set(t.x-t.side*cy,5-.3,t.z),e.l.target.position.set(t.x-t.side*.05,1.72-t.h*.35,t.z),e.l.target.updateMatrixWorld()}assign(e,t){let n=t.getWorldDirection(this.tmp),i=[];for(let c of e){if(!c.mesh||!c.mesh.visible||c.group&&!c.group.visible||!(c.dist<hy))continue;let h=c.x-t.position.x,u=c.z-t.position.z,d=(h*n.x+u*n.z)/(Math.hypot(h,u)||1);i.push({it:c,score:c.dist-d*4})}i.sort((c,h)=>c.score-h.score);let s=new Set(i.slice(0,this.active).map(c=>c.it)),a=new Set(this.pool.filter(c=>c.it&&s.has(c.it)).map(c=>c.it)),o=this.pool.filter(c=>c.l.visible&&(!c.it||!s.has(c.it))),l=[...s].filter(c=>!a.has(c));o.forEach((c,h)=>{c.next=l[h]||null}),this.pool.forEach(c=>{c.it&&s.has(c.it)&&(c.next=void 0)})}update(e){let t=Math.min(1,e*uy);for(let n of this.pool){let i=n.next!==void 0&&n.next!==n.it,s=i||!n.it?0:1;n.cur+=(s-n.cur)*t,i&&n.cur<.02&&(n.cur=0,n.next?this.place(n,n.next):n.it=null,n.next=void 0),n.l.intensity=n.cur*this.dim*this.power*(n.it&&this.factor?this.factor(n.it):1)}}};var dy=`
vec4 bpWorld = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
  bpWorld = instanceMatrix * bpWorld;
#endif
vBpWorld = ( modelMatrix * bpWorld ).xyz;
`,fy=`
reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
if ( all( greaterThan( vBpWorld, bpMin - 0.3 ) ) && all( lessThan( vBpWorld, bpMax + 0.3 ) ) ) {
  // \u0431\u0435\u0437 \u0434\u0435\u043B\u0435\u043D\u0438\u044F \u043D\u0430 \u043D\u043E\u043B\u044C: \u0443 \u0441\u0442\u0440\u043E\u0433\u043E \u043E\u0441\u0435\u0432\u043E\u0433\u043E \u043B\u0443\u0447\u0430 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430 \u0431\u044B\u0432\u0430\u0435\u0442 \u0440\u043E\u0432\u043D\u043E 0
  vec3 rv = reflectVec + vec3( equal( reflectVec, vec3( 0.0 ) ) ) * 1e-4;
  vec3 bt1 = ( bpMax - vBpWorld ) / rv;
  vec3 bt2 = ( bpMin - vBpWorld ) / rv;
  vec3 btf = max( bt1, bt2 );
  float bt = clamp( min( min( btf.x, btf.y ), btf.z ), 0.0, 1e4 );
  vec3 bd = vBpWorld + reflectVec * bt - bpPos;
  if ( dot( bd, bd ) > 1e-8 ) reflectVec = normalize( bd );
}
`,bl=class{constructor(e,t,n){this.renderer=e,this.scene=t;let i=n?128:256;this.rt=new Wr(i,{type:Pt}),this.cam=new Gr(.05,80,this.rt),this.pm=new ki(e),this.env=null,this.mats=[],this.u={bpMin:{value:new P(-1e4,-1e4,-1e4)},bpMax:{value:new P(1e4,1e4,1e4)},bpPos:{value:new P}}}patch(e){let t=this.u;e.userData.probeOnly=!Object.prototype.hasOwnProperty.call(e,"onBeforeCompile");let n=e.onBeforeCompile,i=e.customProgramCacheKey.call(e);e.onBeforeCompile=(s,a)=>{n.call(e,s,a),Object.assign(s.uniforms,t),s.vertexShader=`varying vec3 vBpWorld;
`+s.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
`+dy),s.fragmentShader=`varying vec3 vBpWorld;
uniform vec3 bpMin;
uniform vec3 bpMax;
uniform vec3 bpPos;
`+s.fragmentShader.replace("#include <envmap_physical_pars_fragment>",Be.envmap_physical_pars_fragment.replace("reflectVec = inverseTransformDirection( reflectVec, viewMatrix );",fy))},e.customProgramCacheKey=()=>"artg-bp"+i,e.needsUpdate=!0,this.mats.push(e)}begin(e,t){return this.off?!1:(this.job={box:e,pos:t.clone(),face:0},!0)}step(){let e=this.job,t=this.renderer;if(!e)return!0;if(e.face<6){let i=this.cam;i.position.copy(e.pos),i.updateMatrixWorld(),i.coordinateSystem!==t.coordinateSystem&&(i.coordinateSystem=t.coordinateSystem,i.updateCoordinateSystem());let s=t.getRenderTarget(),a=this.scene.fog;this.scene.fog=null;let o=this.rt.texture,l=o.generateMipmaps;return o.generateMipmaps=e.face===5?l:!1,t.setRenderTarget(this.rt,e.face),t.render(this.scene,i.children[e.face]),o.generateMipmaps=l,t.setRenderTarget(s),this.scene.fog=a,e.face++,!1}this.job=null;let n=this.pm.fromCubemap(this.rt.texture);this.env&&this.env.dispose(),this.env=n,this.u.bpMin.value.copy(e.box.min),this.u.bpMax.value.copy(e.box.max),this.u.bpPos.value.copy(e.pos);for(let i of this.mats){let s=!i.envMap;i.envMap=n.texture,s&&(i.needsUpdate=!0)}return!0}capture(e,t){if(this.begin(e,t))for(;!this.step(););}dispose(){this.rt.dispose(),this.env&&this.env.dispose(),this.pm.dispose()}};var vl=class extends gi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new vu(t)}),this.register(function(t){return new _u(t)}),this.register(function(t){return new Cu(t)}),this.register(function(t){return new Pu(t)}),this.register(function(t){return new Iu(t)}),this.register(function(t){return new Mu(t)}),this.register(function(t){return new Su(t)}),this.register(function(t){return new wu(t)}),this.register(function(t){return new Eu(t)}),this.register(function(t){return new bu(t)}),this.register(function(t){return new Tu(t)}),this.register(function(t){return new yu(t)}),this.register(function(t){return new Ru(t)}),this.register(function(t){return new Au(t)}),this.register(function(t){return new gu(t)}),this.register(function(t){return new Lu(t)}),this.register(function(t){return new Du(t)})}load(e,t,n,i){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=zi.extractUrlBase(e);a=zi.resolveURL(c,this.path)}else a=zi.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new ta(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Ep){try{a[Je.KHR_BINARY_GLTF]=new Uu(e)}catch(u){i&&i(u);return}s=JSON.parse(a[Je.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Hu(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Je.KHR_MATERIALS_UNLIT:a[u]=new xu;break;case Je.KHR_DRACO_MESH_COMPRESSION:a[u]=new Nu(s,this.dracoLoader);break;case Je.KHR_TEXTURE_TRANSFORM:a[u]=new ku;break;case Je.KHR_MESH_QUANTIZATION:a[u]=new Fu;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function py(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}var Je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},gu=class{constructor(e){this.parser=e,this.name=Je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,h=new fe(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],tn);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Oo(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new xi(h),c.distance=u;break;case"spot":c=new ir(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,yi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},xu=class{constructor(){this.name=Je.KHR_MATERIALS_UNLIT}getMaterialType(){return et}extendParams(e,t,n){let i=[];e.color=new fe(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],tn),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,je))}return Promise.all(i)}},bu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},vu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new G(o,o)}return Promise.all(s)}},_u=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},yu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}},Mu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new fe(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],tn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,je)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}},Su=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}},wu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new fe().setRGB(o[0],o[1],o[2],tn),Promise.all(s)}},Eu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},Tu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new fe().setRGB(o[0],o[1],o[2],tn),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,je)),Promise.all(s)}},Au=class{constructor(e){this.parser=e,this.name=Je.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}},Ru=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}},Cu=class{constructor(e){this.parser=e,this.name=Je.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},Pu=class{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Iu=class{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Lu=class{constructor(e){this.name=Je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},Du=class{constructor(e){this.name=Je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==Rn.TRIANGLES&&c.mode!==Rn.TRIANGLE_STRIP&&c.mode!==Rn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let m of u){let b=new Te,g=new P,p=new Ft,_=new P(1,1,1),v=new On(m.geometry,m.material,d);for(let x=0;x<d;x++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,x),l.SCALE&&_.fromBufferAttribute(l.SCALE,x),v.setMatrixAt(x,b.compose(g,p,_));for(let x in l)if(x==="_COLOR_0"){let E=l[x];v.instanceColor=new di(E.array,E.itemSize,E.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&m.geometry.setAttribute(x,l[x]);gt.prototype.copy.call(v,m),this.parser.assignFinalMaterial(v),f.push(v)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Ep="glTF",fa=12,yp={JSON:1313821514,BIN:5130562},Uu=class{constructor(e){this.name=Je.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,fa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ep)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-fa,s=new DataView(e,fa),a=0;for(;a<i;){let o=s.getUint32(a,!0);a+=4;let l=s.getUint32(a,!0);if(a+=4,l===yp.JSON){let c=new Uint8Array(e,fa+a,o);this.content=n.decode(c)}else if(l===yp.BIN){let c=fa+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Nu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=Bu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=Bu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],f=fr[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let m in f.attributes){let b=f.attributes[m],g=l[m];g!==void 0&&(b.normalized=g)}u(f)},o,c,tn,d)})})}},ku=class{constructor(){this.name=Je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Fu=class{constructor(){this.name=Je.KHR_MESH_QUANTIZATION}},_l=class extends Fi{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,m=e*c,b=m-c,g=-2*f+3*d,p=f-d,_=1-g,v=p-d+u;for(let x=0;x!==o;x++){let E=a[b+x+o],w=a[b+x+l]*h,T=a[m+x+o],I=a[m+x]*h;s[x]=_*E+v*w+g*T+p*I}return s}},my=new Ft,Ou=class extends _l{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return my.fromArray(s).normalize().toArray(s),s}},Rn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},fr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Mp={9728:Rt,9729:Vt,9984:Bh,9985:Lr,9986:Ds,9987:yn},Sp={33071:_n,33648:Br,10497:Qt},fu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Bu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},qi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},gy={CUBICSPLINE:void 0,LINEAR:Xs,STEP:qs},pu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function xy(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new vt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qn})),r.DefaultMaterial}function ds(r,e,t){for(let n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function yi(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function by(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function vy(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _y(r){let e,t=r.extensions&&r.extensions[Je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+mu(t.attributes):e=r.indices+":"+mu(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+mu(r.targets[n]);return e}function mu(r){let e="",t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function zu(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function yy(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var My=new Te,Hu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new py,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator!="undefined"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap=="undefined"||n&&i<17||s&&a<98?this.textureLoader=new Xn(this.options.manager):this.textureLoader=new Bo(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ta(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return ds(s,o,i),yi(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Je.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,a){n.load(zi.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=fu[i.type],o=fr[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new ut(c,a,l))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],l=fu[i.type],c=fr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,b,g;if(f&&f!==u){let p=Math.floor(d/f),_="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,v=t.cache.get(_);v||(b=new c(o,p*f,i.count*f/h),v=new Js(b,f/h),t.cache.add(_,v)),g=new as(v,l,d%f/h,m)}else o===null?b=new c(i.count*l):b=new c(o,d,i.count*l),g=new ut(b,l,m);if(i.sparse!==void 0){let p=fu.SCALAR,_=fr[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,E=new _(a[1],v,i.sparse.count*p),w=new c(a[2],x,i.sparse.count*l);o!==null&&(g=new ut(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let T=0,I=E.length;T<I;T++){let S=E[T];if(g.setX(S,w[T*l]),l>=2&&g.setY(S,w[T*l+1]),l>=3&&g.setZ(S,w[T*l+2]),l>=4&&g.setW(S,w[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(s.samplers||{})[a.sampler]||{};return h.magFilter=Mp[d.magFilter]||Vt,h.minFilter=Mp[d.minFilter]||yn,h.wrapS=Sp[d.wrapS]||Qt,h.wrapT=Sp[d.wrapT]||Qt,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Rt&&h.minFilter!==Vt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(b){let g=new St(b);g.needsUpdate=!0,d(g)}),t.load(zi.resolveURL(u,s.path),m,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),yi(u,a),u.userData.mimeType=a.mimeType||yy(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[Je.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Je.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=s.associations.get(a);a=s.extensions[Je.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Yr,$t.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new jr,$t.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return vt}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],a,o={},l=s.extensions||{},c=[];if(l[Je.KHR_MATERIALS_UNLIT]){let u=i[Je.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{let u=s.pbrMetallicRoughness||{};if(o.color=new fe(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],tn),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,je)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Ht);let h=s.alphaMode||pu.OPAQUE;if(h===pu.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===pu.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==et&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new G(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==et&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==et){let u=s.emissiveFactor;o.emissive=new fe().setRGB(u[0],u[1],u[2],tn)}return s.emissiveTexture!==void 0&&a!==et&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,je)),Promise.all(c).then(function(){let u=new a(o);return s.name&&(u.name=s.name),yi(u,s),t.associations.set(u,{materials:e}),s.extensions&&ds(i,u,s),u})}createUniqueName(e){let t=ft.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return wp(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=_y(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[Je.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=wp(new pt,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?xy(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,m=h.length;f<m;f++){let b=h[f],g=a[f],p,_=c[f];if(g.mode===Rn.TRIANGLES||g.mode===Rn.TRIANGLE_STRIP||g.mode===Rn.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new mo(b,_):new Ne(b,_),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===Rn.TRIANGLE_STRIP?p.geometry=nu(p.geometry,jo):g.mode===Rn.TRIANGLE_FAN&&(p.geometry=nu(p.geometry,sa));else if(g.mode===Rn.LINES)p=new vo(b,_);else if(g.mode===Rn.LINE_STRIP)p=new Qs(b,_);else if(g.mode===Rn.LINE_LOOP)p=new _o(b,_);else if(g.mode===Rn.POINTS)p=new $s(b,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&vy(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),yi(p,s),g.extensions&&ds(i,p,g),t.assignFinalMaterial(p),u.push(p)}for(let f=0,m=u.length;f<m;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&ds(i,u[0],s),u[0];let d=new Mt;s.extensions&&ds(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nt(zf.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ni(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),yi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new Te;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new go(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],m=i.samplers[f.sampler],b=f.target,g=b.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,_=i.parameters!==void 0?i.parameters[m.output]:m.output;b.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",_)),c.push(m),h.push(b))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],m=u[2],b=u[3],g=u[4],p=[];for(let _=0,v=d.length;_<v;_++){let x=d[_],E=f[_],w=m[_],T=b[_],I=g[_];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();let S=n._createAnimationTracks(x,E,w,T,I);if(S)for(let y=0;y<S.length;y++)p.push(S[y])}return new nr(s,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,My)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new Xr:c.length>1?h=new Mt:c.length===1?h=c[0]:h=new gt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),yi(h,s),s.extensions&&ds(n,h,s),s.matrix!==void 0){let u=new Te;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new Mt;n.name&&(s.name=i.createUniqueName(n.name)),yi(s,n),n.extensions&&ds(t,s,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);let c=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof $t||d instanceof St)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let a=[],o=e.name?e.name:e.uuid,l=[];qi[s.path]===qi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(qi[s.path]){case qi.weights:c=fi;break;case qi.rotation:c=pi;break;case qi.position:case qi.scale:c=mi;break;default:n.itemSize===1?c=fi:c=mi;break}let h=i.interpolation!==void 0?gy[i.interpolation]:Xs,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let m=new c(l[d]+"."+qi[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=zu(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof pi?Ou:_l;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Sy(r,e,t){let n=e.attributes,i=new hn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new P(l[0],l[1],l[2]),new P(c[0],c[1],c[2])),o.normalized){let h=zu(fr[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new P,l=new P;for(let c=0,h=s.length;c<h;c++){let u=s[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){let b=zu(fr[d.componentType]);l.multiplyScalar(b)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;let a=new on;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function wp(r,e,t){let n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(let a in n){let o=Bu[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){let a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return Ke.workingColorSpace!==tn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),yi(r,e),Sy(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?by(r,e.targets,t):r})}var Tp=(function(){"use strict";var r="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:r,s,a=WebAssembly.instantiate(o(i),{}).then(function(p){s=p.instance,s.exports.__wasm_call_ctors()});function o(p){for(var _=new Uint8Array(p.length),v=0;v<p.length;++v){var x=p.charCodeAt(v);_[v]=x>96?x-97:x>64?x-39:x+4}for(var E=0,v=0;v<p.length;++v)_[E++]=_[v]<60?n[_[v]]:(_[v]-60)*64+_[++v];return _.buffer.slice(0,E)}function l(p,_,v,x,E,w){var T=s.exports.sbrk,I=v+3&-4,S=T(I*x),y=T(E.length),R=new Uint8Array(s.exports.memory.buffer);R.set(E,y);var F=p(S,v,x,y,E.length);if(F==0&&w&&w(S,I,x),_.set(R.subarray(S,S+v*x)),T(S-T(0)),F!=0)throw new Error("Malformed buffer data: "+F)}var c={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],d=0;function f(p){var _={object:new Worker(p),pending:0,requests:{}};return _.object.onmessage=function(v){var x=v.data;_.pending-=x.count,_.requests[x.id][x.action](x.value),delete _.requests[x.id]},_}function m(p){for(var _="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+l.toString()+g.toString(),v=new Blob([_],{type:"text/javascript"}),x=URL.createObjectURL(v),E=0;E<p;++E)u[E]=f(x);URL.revokeObjectURL(x)}function b(p,_,v,x,E){for(var w=u[0],T=1;T<u.length;++T)u[T].pending<w.pending&&(w=u[T]);return new Promise(function(I,S){var y=new Uint8Array(v),R=d++;w.pending+=p,w.requests[R]={resolve:I,reject:S},w.object.postMessage({id:R,count:p,size:_,source:y,mode:x,filter:E},[y.buffer])})}function g(p){a.then(function(){var _=p.data;try{var v=new Uint8Array(_.count*_.size);l(s.exports[_.mode],v,_.count,_.size,_.source,s.exports[_.filter]),self.postMessage({id:_.id,count:_.count,action:"resolve",value:v},[v.buffer])}catch(x){self.postMessage({id:_.id,count:_.count,action:"reject",value:x})}})}return{ready:a,supported:!0,useWorkers:function(p){m(p)},decodeVertexBuffer:function(p,_,v,x,E){l(s.exports.meshopt_decodeVertexBuffer,p,_,v,x,s.exports[c[E]])},decodeIndexBuffer:function(p,_,v,x){l(s.exports.meshopt_decodeIndexBuffer,p,_,v,x)},decodeIndexSequence:function(p,_,v,x){l(s.exports.meshopt_decodeIndexSequence,p,_,v,x)},decodeGltfBuffer:function(p,_,v,x,E,w){l(s.exports[h[E]],p,_,v,x,s.exports[c[w]])},decodeGltfBufferAsync:function(p,_,v,x,E){return u.length>0?b(p,_,v,h[x],c[E]):a.then(function(){var w=new Uint8Array(p*_);return l(s.exports[h[x]],w,p,_,v,s.exports[c[E]]),w})}}})();function Ap(r){let e=new Map,t=new Map,n=r.clone();return Rp(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let s=i,a=e.get(i),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Rp(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)Rp(r.children[n],e.children[n],t)}var wy={f:1.45,m:1.2},yl=class{constructor(e){this.url=e,this.loader=new vl().setMeshoptDecoder(Tp),this.models=new Map,this.anims=null}get(e,t){if(!this.clips())return null;let n=e+t,i=this.models.get(n);return i||(i={state:"load"},this.models.set(n,i),this.loader.load(this.url("avatars/"+n+".glb"),s=>{i.gltf=s;let a=new hn().setFromObject(s.scene);i.h=a.max.y,s.scene.traverse(o=>{o.isMesh&&(o.castShadow=o.receiveShadow=!1,o.material.alphaTest>0&&(o.userData.noAO=!0))}),i.state="ok"},void 0,()=>{i.state="fail"})),i.state==="ok"?i:null}clips(){if(!this.anims){let e=this.anims={state:"load"};this.loader.load(this.url("avatars/anims.glb"),t=>{e.clips={};for(let n of t.animations)e.clips[n.name]=n;e.state="ok"},void 0,()=>{e.state="fail"})}return this.anims.state==="ok"?this.anims.clips:null}make(e,t){let n=this.get(e,t);if(!n)return null;let i=Ap(n.gltf.scene),s=[];i.traverse(u=>{u.isMesh&&s.push(u)});let a=this.anims.clips,o=new Ho(i),l=o.clipAction(a[e+"_idle"]),c=o.clipAction(a[e+"_walk"]);l.play(),c.play(),l.time=Math.random()*l.getClip().duration,c.time=Math.random()*c.getClip().duration;let h=0;return{root:i,meshes:s,h:n.h,mixer:o,update(u,d){let f=Math.min(1,Math.max(0,(d-.12)/.5));h+=(f-h)*Math.min(1,u*6),c.setEffectiveWeight(h),l.setEffectiveWeight(1-h),c.setEffectiveTimeScale(Math.max(.55,Math.min(1.6,d/wy[e]))),o.update(u)},dispose(){o.stopAllAction(),o.uncacheRoot(i)}}}dispose(){for(let e of this.models.values())e.gltf&&e.gltf.scene.traverse(t=>{t.isMesh&&(t.geometry.dispose(),t.material.map&&t.material.map.dispose(),t.material.dispose())});this.models.clear()}};var Vu={f:[2829102,4861988,8020560,13204098,4871808,5917256,13158588,14210764],m:[2500138,2896968,9414852,11022380,3815478,15132386,12100744,5789788]},Zn=new fe(15321512),Gu=new fe(4864558),Ml=new fe(1973016),pr=24,Ey=12,Ty=40,Cp=100,Ay=150,Ry=6,Cy=.8,Py=14,Iy=17;function ht(r,e,t,n,i,s=0,a=0){(s||a)&&r.rotateX(s).rotateZ(a),r.translate(t,n,i);let o=r.attributes.position.count,l=new Float32Array(o*3);for(let c=0;c<o;c++)l[c*3]=e.r,l[c*3+1]=e.g,l[c*3+2]=e.b;return r.setAttribute("color",new ut(l,3)),r.deleteAttribute("uv"),r}var Hn=new fe(1,1,1),gn=(r,e,t,n=10)=>new Lt(r,e,t,n,1),Jn=(r,e=12,t=8)=>new tr(r,e,t);function Ly(r){let e=[],t=[];r==="m"?(e.push(ht(gn(.075,.068,.82),Hn,-.095,.47,0)),e.push(ht(gn(.075,.068,.82),Hn,.095,.47,0)),e.push(ht(gn(.2,.17,.58),Hn,0,1.15,0)),e.push(ht(Jn(.2,12,6).scale(1,.35,.8),Hn,0,1.43,0)),e.push(ht(gn(.05,.045,.58),Hn,-.235,1.12,0,0,.08)),e.push(ht(gn(.05,.045,.58),Hn,.235,1.12,0,0,-.08)),t.push(ht(new dt(.1,.07,.24),Ml,-.095,.035,-.03)),t.push(ht(new dt(.1,.07,.24),Ml,.095,.035,-.03)),t.push(ht(new dt(.07,.3,.02),new fe(16052714),0,1.3,-.165)),t.push(ht(Jn(.042,6,4),Zn,-.26,.8,0)),t.push(ht(Jn(.042,6,4),Zn,.26,.8,0)),t.push(ht(gn(.045,.05,.1,8),Zn,0,1.52,0)),t.push(ht(Jn(.105).scale(.92,1.1,1),Zn,0,1.61,0)),t.push(ht(Jn(.11,12,6).scale(.95,.7,1),Gu,0,1.66,.012))):(e.push(ht(gn(.16,.3,.72,14),Hn,0,.5,0)),e.push(ht(gn(.155,.16,.5),Hn,0,1.11,0)),e.push(ht(Jn(.17,12,6).scale(1,.32,.8),Hn,0,1.36,0)),e.push(ht(gn(.042,.038,.52),Hn,-.195,1.1,0,0,.1)),e.push(ht(gn(.042,.038,.52),Hn,.195,1.1,0,0,-.1)),t.push(ht(gn(.035,.03,.14,8),Zn,-.07,.1,0)),t.push(ht(gn(.035,.03,.14,8),Zn,.07,.1,0)),t.push(ht(new dt(.075,.05,.2),Ml,-.07,.025,-.03)),t.push(ht(new dt(.075,.05,.2),Ml,.07,.025,-.03)),t.push(ht(Jn(.036,6,4),Zn,-.23,.82,0)),t.push(ht(Jn(.036,6,4),Zn,.23,.82,0)),t.push(ht(gn(.04,.045,.1,8),Zn,0,1.44,0)),t.push(ht(Jn(.098).scale(.9,1.1,.98),Zn,0,1.55,0)),t.push(ht(Jn(.108,12,8).scale(.98,1.05,1.02),Gu,0,1.57,.02)),t.push(ht(new dt(.2,.3,.07),Gu,0,1.43,.07)));let n=i=>{let s=or(i.map(a=>a.index?a.toNonIndexed():a),!1);return s.computeVertexNormals(),s};return{cloth:n(e),skin:n(t)}}function Dy(){let r=document.createElement("canvas");r.width=r.height=64;let e=r.getContext("2d"),t=e.createRadialGradient(32,32,2,32,32,31);t.addColorStop(0,"rgba(30,24,16,0.38)"),t.addColorStop(.6,"rgba(30,24,16,0.12)"),t.addColorStop(1,"rgba(30,24,16,0)"),e.fillStyle=t,e.fillRect(0,0,64,64);let n=new en(r);return n.colorSpace=je,n}function Uy(r){let e=document.createElement("canvas"),t=e.getContext("2d"),n='600 40px "Helvetica Neue", Arial, sans-serif';t.font=n;let i=Math.min(560,Math.ceil(t.measureText(r).width)+44);e.width=i,e.height=64,t.font=n,t.fillStyle="rgba(255,255,255,0.92)";let s=30;t.beginPath(),t.moveTo(s,2),t.arcTo(i-2,2,i-2,62,s),t.arcTo(i-2,62,2,62,s),t.arcTo(2,62,2,2,s),t.arcTo(2,2,i-2,2,s),t.fill(),t.fillStyle="#2a2a2a",t.textAlign="center",t.textBaseline="middle",t.fillText(r,i/2,34,i-30);let a=new en(e);a.colorSpace=je,a.anisotropy=4;let o=new qr({map:a,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1});o.color.setScalar(1.45);let l=new po(o);return l.center.set(.5,0),l.userData.aspect=i/64,l.userData.noAO=!0,l.renderOrder=5,l}var mr=new Te,Wu=new Ft,Pp=new Wt(0,0,0,"YXZ"),qu=new P,Ip=new P(1,1,1),Ny=new fe,Lp=new on(new P,1.1),Sl=class{constructor(e,t,n,i){this.scene=e,this.small=t,this.avs=n?new yl(n):null,this.amax=t?4:8,this.pick=i||[],this.frustum=new ui,this.list=new Map,this.me=null,this.base=null,this.arr=[],this.delay=Cp,this.meshes=[],this.ids={f:[],m:[]};let s=a=>new vt({vertexColors:!0,roughness:.8,metalness:0,envMapIntensity:.4});this.group=new Mt,this.group.name="peers";for(let a of["f","m"]){let o=Ly(a),l=new On(o.cloth,s(),pr);l.instanceColor=new di(new Float32Array(pr*3),3);let c=new On(o.skin,s(),pr);for(let h of[l,c])h.count=0,h.frustumCulled=!1,h.userData.peer=a,h.castShadow=!1,this.group.add(h);this[a]={cloth:l,skin:c},this.meshes.push(l,c)}if(!t){let a=new wt(.9,.9).rotateX(-Math.PI/2);this.shadow=new On(a,new et({map:Dy(),transparent:!0,depthWrite:!1,toneMapped:!1}),pr),this.shadow.count=0,this.shadow.frustumCulled=!1,this.shadow.renderOrder=1,this.shadow.userData.noAO=!0,this.group.add(this.shadow)}e.add(this.group)}set(e){let t=new Set;for(let n of e)t.add(n.id),this.upsert(n);for(let n of[...this.list.keys()])t.has(n)||this.drop(n)}upsert(e){let t=this.list.get(e.id);return t||(t={id:e.id,buf:[],x:0,z:0,yaw:0,shown:!1,speed:0,phase:Math.random()*6,breath:Math.random()*6},this.list.set(e.id,t)),t.name!==e.name&&t.label&&(this.group.remove(t.label),t.label.material.map.dispose(),t.label.material.dispose(),t.label=null),t.name=e.name,t.sex=e.sex==="m"?"m":"f",t.outfit=Vu[t.sex][e.outfit]!=null?e.outfit:0,t.av&&t.av.key!==t.sex+t.outfit&&this.unav(t),t}unav(e){let t=e.av;if(t){this.group.remove(t.root);for(let n of t.meshes){let i=this.pick.indexOf(n);i>=0&&this.pick.splice(i,1)}t.dispose(),e.av=null}}avatar(e){if(e.av)return e.av;let t=this.avs.make(e.sex,e.outfit);if(!t)return null;t.key=e.sex+e.outfit,t.on=!1,t.root.visible=!1;for(let n of t.meshes)n.userData.peer="a",n.userData.pid=e.id,this.pick.push(n);return this.group.add(t.root),e.av=t}drop(e){let t=this.list.get(e);t&&(t.label&&(this.group.remove(t.label),t.label.material.map.dispose(),t.label.material.dispose()),this.unav(t),this.list.delete(e))}move(e,t){let n=performance.now();if(t){for(this.arr.push([n,t-n]);this.arr.length>1&&n-this.arr[0][0]>1e4;)this.arr.shift();let s=-1/0;for(let c of this.arr)c[1]>s&&(s=c[1]);this.base=s;let a=this.arr.slice(-60).map(c=>s-c[1]).sort((c,h)=>c-h),o=a[Math.floor(a.length*.95)]||0,l=Math.max(Cp,Math.min(1500,o+50));this.delay=l>this.delay?l:this.delay+(l-this.delay)*.03}let i=t||n+(this.base||0);for(let s of e){if(s[0]===this.me)continue;let a=this.list.get(s[0]);if(!a)continue;let o=a.buf[a.buf.length-1],l={t:i,sec:s[1],room:s[2],x:s[3],z:s[4],yaw:s[5]};o&&Math.hypot(l.x-o.x,l.z-o.z)>Ry&&(a.buf.length=0),o&&i<=o.t&&(l.t=o.t+1),a.buf.push(l),a.buf.length>30&&a.buf.shift(),a.sec=l.sec,a.shown||(a.x=l.x,a.z=l.z,a.yaw=l.yaw)}}sample(e,t){let n=e.buf;if(!n.length)return null;if(t<=n[0].t)return n[0];for(let a=n.length-1;a>0;a--){let o=n[a-1],l=n[a];if(t>=o.t&&t<=l.t){let c=(t-o.t)/Math.max(1,l.t-o.t),h=l.yaw-o.yaw;return h=Math.atan2(Math.sin(h),Math.cos(h)),{x:o.x+(l.x-o.x)*c,z:o.z+(l.z-o.z)*c,yaw:o.yaw+h*c}}}let i=n[n.length-1],s=n.length>1?n[n.length-2]:null;if(s&&t-i.t<Ay){let a=(t-i.t)/Math.max(1,i.t-s.t);return{x:i.x+(i.x-s.x)*a,z:i.z+(i.z-s.z)*a,yaw:i.yaw}}return i}update(e,t){let i=performance.now()+(this.base||0)-this.delay,s=t.position.x,a=t.position.z,o=[];for(let u of this.list.values()){let d=this.sample(u,i);if(!d){u.shown=!1;continue}let f=u.x,m=u.z;u.x=d.x,u.z=d.z;let b=d.yaw-u.yaw;u.yaw+=Math.atan2(Math.sin(b),Math.cos(b))*Math.min(1,e*14);let g=u.shown&&e>0?Math.hypot(u.x-f,u.z-m)/e:0;u.speed+=(Math.min(g,3)-u.speed)*Math.min(1,e*8),u.shown=!0,u.d=Math.hypot(u.x-s,u.z-a),u.d<Ty&&u.d>Cy&&o.push(u)}o.sort((u,d)=>u.d-d.d),o.length>pr&&(o.length=pr);let l=0;if(this.avs){this.frustum.setFromProjectionMatrix(mr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse));for(let u of o){let d=l<this.amax&&u.d<(u.av&&u.av.on?Iy:Py),f=d?this.avatar(u):u.av;f&&(f.on=d,f.root.visible=d,d&&(l++,f.root.position.set(u.x,0,u.z),f.root.rotation.y=u.yaw+Math.PI,Lp.center.set(u.x,.9,u.z),this.frustum.intersectsSphere(Lp)&&f.update(e,u.speed)))}}for(let u of this.list.values())u.av&&u.av.on&&!o.includes(u)&&(u.av.on=!1,u.av.root.visible=!1);let c={f:0,m:0};this.ids.f.length=0,this.ids.m.length=0;let h=0;for(let u=0;u<o.length;u++){let d=o[u],f=Math.min(1,d.speed/.9);d.phase+=e*(d.speed/.72)*Math.PI,d.breath+=e*1.6;let m=f*.022*Math.abs(Math.sin(d.phase))+(1-f)*.004*Math.sin(d.breath);Pp.set(-.05*f,d.yaw,.03*f*Math.sin(d.phase)),Wu.setFromEuler(Pp),qu.set(d.x,m,d.z),mr.compose(qu,Wu,Ip);let b=d.av&&d.av.on;if(!b){let g=c[d.sex]++,p=this[d.sex];p.cloth.setMatrixAt(g,mr),p.skin.setMatrixAt(g,mr),p.cloth.setColorAt(g,Ny.setHex(Vu[d.sex][d.outfit])),this.ids[d.sex][g]=d.id}if(this.shadow&&(mr.compose(qu.set(d.x,.012,d.z),Wu.identity(),Ip),this.shadow.setMatrixAt(h++,mr)),u<(this.small?10:Ey)){d.label||(d.label=Uy(d.name),this.group.add(d.label)),d.label.visible=!0,d.label.position.set(d.x,b?d.av.h+.1:(d.sex==="m"?1.84:1.78)+m,d.z);let g=.22*Math.max(1,d.d/9);d.label.scale.set(g*d.label.userData.aspect,g,1),d.label.material.opacity=d.d<12?1:Math.max(.25,1-(d.d-12)/20)}else d.label&&(d.label.visible=!1);d.hidden=!1}for(let u of this.list.values())!o.includes(u)&&u.label&&(u.label.visible=!1);for(let u of["f","m"]){let d=this[u];d.cloth.count=d.skin.count=c[u],d.cloth.instanceMatrix.needsUpdate=d.skin.instanceMatrix.needsUpdate=!0,d.cloth.instanceColor&&(d.cloth.instanceColor.needsUpdate=!0),d.cloth.boundingSphere=d.skin.boundingSphere=null}this.shadow&&(this.shadow.count=h,this.shadow.instanceMatrix.needsUpdate=!0)}hitId(e){let t=e.object.userData;return t.pid?t.pid:t.peer&&e.instanceId!=null?this.ids[t.peer][e.instanceId]:null}dots(){let e=[];for(let t of this.list.values())t.shown&&e.push({x:t.x,z:t.z,name:t.name,color:"#"+new fe(Vu[t.sex][t.outfit]).getHexString()});return e}dispose(){for(let e of[...this.list.keys()])this.drop(e);this.avs&&this.avs.dispose(),this.scene.remove(this.group),this.group.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(e.material.map&&e.material.map.dispose(),e.material.dispose())})}};function ky(r){let e=document.createElement("canvas");e.width=e.height=256;let t=e.getContext("2d"),n=(s,a,o)=>{t.beginPath(),t.arc(128,128,s,0,Math.PI*2),t.lineWidth=a,t.strokeStyle=o,t.stroke()};n(104,26,"rgba(255,255,255,0.75)"),n(104,15,r),t.beginPath(),t.arc(128,128,20,0,Math.PI*2),t.fillStyle="rgba(255,255,255,0.8)",t.fill(),t.beginPath(),t.arc(128,128,13,0,Math.PI*2),t.fillStyle=r,t.fill();let i=new en(e);return i.colorSpace=je,i}function Dp(r,e){let t=new Ne(new wt(e,e).rotateX(-Math.PI/2),new et({map:ky(r),transparent:!0,depthWrite:!1,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-4}));return t.position.y=.012,t.renderOrder=5,t.visible=!1,t.userData.noAO=!0,t}var wl=class{constructor(e){this.cursor=Dp("rgba(42,42,42,0.8)",.7),this.dest=Dp("#d4574f",.75),e.add(this.cursor,this.dest);let t=this.cursor.material.clone();t.opacity=.62,this.hints=[];for(let n=0;n<6;n++){let i=new Ne(this.cursor.geometry,t);i.position.y=.012,i.renderOrder=5,i.visible=!1,i.userData.noAO=!0,e.add(i),this.hints.push(i)}this.fade=0,this.t=0}hover(e){if(!e){this.cursor.visible=!1;return}this.cursor.position.x=e.x,this.cursor.position.z=e.z,this.cursor.visible=!0}showHints(e){this.hints.forEach((t,n)=>{let i=e[n];t.visible=!!i,i&&(t.position.x=i[0],t.position.z=i[1])})}target(e,t){this.dest.position.x=e,this.dest.position.z=t,this.dest.visible=!0,this.dest.material.opacity=1,this.fade=1,this.cursor.visible=!1}update(e,t){if(!this.dest.visible)return;if(this.t+=e,t||(this.fade-=e*2.5),this.fade<=0){this.dest.visible=!1;return}let n=1+.1*Math.sin(this.t*6);this.dest.scale.set(n,1,n),this.dest.material.opacity=Math.min(1,this.fade)}};var Xi=16,Fy=`
varying float vAlong; varying float vEdge;
void main(){
  vAlong = uv.y;                                           // 1 \u2014 \u0443 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430, 0 \u2014 \u0443 \u043A\u0430\u0440\u0442\u0438\u043D\u044B
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vec3 n = normalize(mat3(modelMatrix) * normal);
  vec3 v = normalize(cameraPosition - wp.xyz);
  vEdge = abs(dot(n, v));                                  // 1 \u2014 \u0441\u0435\u0440\u0435\u0434\u0438\u043D\u0430 \u043A\u043E\u043D\u0443\u0441\u0430 \u043A \u0437\u0440\u0438\u0442\u0435\u043B\u044E, 0 \u2014 \u043A\u0440\u043E\u043C\u043A\u0430
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Oy=`
uniform float strength; varying float vAlong; varying float vEdge;
void main(){
  float a = strength * pow(vEdge, 2.2) * smoothstep(0.0, 0.35, vAlong) * (0.35 + 0.65 * vAlong);
  gl_FragColor = vec4(vec3(1.0, 0.95, 0.86) * a, 1.0);
}`,By=`
uniform vec3 center; uniform float box; uniform float time; uniform float px;
uniform vec3 spotPos[${Xi}]; uniform vec3 spotDir[${Xi}]; uniform float spotOn[${Xi}];
attribute float seed;
varying float vLit;
void main(){
  // \u0434\u0440\u0435\u0439\u0444: \u043C\u0435\u0434\u043B\u0435\u043D\u043D\u044B\u0439 \u043F\u043E\u0434\u044A\u0451\u043C \u0438 \u043F\u043E\u043A\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u0435, \u0443 \u043A\u0430\u0436\u0434\u043E\u0439 \u043F\u044B\u043B\u0438\u043D\u043A\u0438 \u0441\u0432\u043E\u0451
  vec3 p = position + vec3(sin(time * 0.11 + seed * 6.3) * 0.25, time * (0.012 + seed * 0.01), cos(time * 0.09 + seed * 4.1) * 0.25);
  p.xz = mod(p.xz - center.xz + box * 0.5, box) - box * 0.5 + center.xz;   // \u043E\u0431\u043B\u0430\u043A\u043E \u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u0437\u0430 \u0437\u0440\u0438\u0442\u0435\u043B\u0435\u043C
  p.y = mod(p.y, 4.6) + 0.1;                                                // \u0438 \u0437\u0430\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0434 \u043F\u043E\u0442\u043E\u043B\u043A\u043E\u043C
  float lit = 0.0;
  for (int i = 0; i < ${Xi}; i++) {
    vec3 d = p - spotPos[i];
    float l = length(d);
    float c = dot(d / max(l, 1e-3), spotDir[i]);
    lit += spotOn[i] * smoothstep(0.93, 0.975, c) * smoothstep(7.0, 1.0, l);
  }
  vLit = min(lit, 1.0);
  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_PointSize = px * (0.6 + seed) / -mv.z;
  gl_Position = projectionMatrix * mv;
}`,zy=`
varying float vLit;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float a = smoothstep(0.5, 0.0, length(c));
  gl_FragColor = vec4(vec3(1.0, 0.96, 0.88) * a * (0.04 + vLit * 0.9), 1.0);
}`,El=class{constructor(e,t,n){this.spots=t,this.beams=t.pool.map(()=>{let c=new Lt(.03,1,1,24,1,!0);c.translate(0,-.5,0);let h=new Ne(c,new st({vertexShader:Fy,fragmentShader:Oy,uniforms:{strength:{value:0}},transparent:!0,depthWrite:!1,blending:is,side:Ht}));return h.frustumCulled=!1,h.renderOrder=5,h.userData.noAO=!0,e.add(h),h});let i=n?500:1800,s=12,a=new Float32Array(i*3),o=new Float32Array(i);for(let c=0;c<i;c++)a[c*3]=(Math.random()-.5)*s,a[c*3+1]=.2+Math.random()*4.4,a[c*3+2]=(Math.random()-.5)*s,o[c]=Math.random();let l=new pt;l.setAttribute("position",new ut(a,3)),l.setAttribute("seed",new ut(o,1)),this.dustU={center:{value:new P},box:{value:s},time:{value:0},px:{value:18},spotPos:{value:Array.from({length:Xi},()=>new P)},spotDir:{value:Array.from({length:Xi},()=>new P(0,-1,0))},spotOn:{value:new Array(Xi).fill(0)}},this.dust=new $s(l,new st({vertexShader:By,fragmentShader:zy,uniforms:this.dustU,transparent:!0,depthWrite:!1,blending:is})),this.dust.frustumCulled=!1,this.dust.renderOrder=6,this.dust.visible=!1,e.add(this.dust),this.on=!0,this.v=new P}setEnabled(e){this.on=e,this.dust.visible=!1,this.beams.forEach(t=>{t.visible=e})}update(e,t,n){if(!this.on)return;let i=this.dustU;i.time.value=performance.now()/1e3%1e4,i.center.value.set(e.position.x,2.4,e.position.z),i.px.value=.012*n*t,this.spots.pool.forEach((s,a)=>{let o=this.beams[a],l=s.it?s.cur*this.spots.dim:0;if(a<Xi&&(i.spotOn.value[a]=l,i.spotPos.value[a].copy(s.l.position),i.spotDir.value[a].copy(s.l.target.position).sub(s.l.position).normalize()),o.visible=l>.01,!o.visible)return;let c=s.l.position,h=s.l.target.position,u=c.distanceTo(h)*1.05,d=Math.tan(s.l.angle*.8)*u;o.position.copy(c),o.scale.set(d,u,d),this.v.copy(h).sub(c).normalize(),o.quaternion.setFromUnitVectors(new P(0,-1,0),this.v),o.material.uniforms.strength.value=l*.07})}};var Up="artg-sound";var pa=[{f:"music/satie-gymnopedie-1.mp3",t:"\u042D\u0440\u0438\u043A \u0421\u0430\u0442\u0438 \u2014 \u0413\u0438\u043C\u043D\u043E\u043F\u0435\u0434\u0438\u044F \u2116 1",p:"\u0420\u043E\u0431\u0438\u043D \u0410\u043B\u044C\u0441\u0438\u0430\u0442\u043E\u0440\u0435"},{f:"music/bach-goldberg-aria.mp3",t:"\u0418. \u0421. \u0411\u0430\u0445 \u2014 \u0410\u0440\u0438\u044F \u0438\u0437 \xAB\u0413\u043E\u043B\u044C\u0434\u0431\u0435\u0440\u0433-\u0432\u0430\u0440\u0438\u0430\u0446\u0438\u0439\xBB",p:"\u041A\u0438\u043C\u0438\u043A\u043E \u0418\u0441\u0438\u0434\u0437\u0430\u043A\u0430"},{f:"music/chopin-nocturne-op9-2.mp3",t:"\u0424\u0440\u0435\u0434\u0435\u0440\u0438\u043A \u0428\u043E\u043F\u0435\u043D \u2014 \u041D\u043E\u043A\u0442\u044E\u0440\u043D op. 9 \u2116 2",p:"\u0424\u0440\u044D\u043D\u043A \u041B\u0435\u0432\u0438"},{f:"music/debussy-clair-de-lune.mp3",t:"\u041A\u043B\u043E\u0434 \u0414\u0435\u0431\u044E\u0441\u0441\u0438 \u2014 \xAB\u041B\u0443\u043D\u043D\u044B\u0439 \u0441\u0432\u0435\u0442\xBB",p:"\u041B\u0430\u0443\u0440\u0435\u043D\u0441 \u0413\u0443\u0434\u0445\u0430\u0440\u0442"},{f:"music/beethoven-fur-elise.mp3",t:"\u041B\u044E\u0434\u0432\u0438\u0433 \u0432\u0430\u043D \u0411\u0435\u0442\u0445\u043E\u0432\u0435\u043D \u2014 \xAB\u041A \u042D\u043B\u0438\u0437\u0435\xBB",p:"Gaodifan"},{f:"music/chopin-nocturne-op48-1.mp3",t:"\u0424\u0440\u0435\u0434\u0435\u0440\u0438\u043A \u0428\u043E\u043F\u0435\u043D \u2014 \u041D\u043E\u043A\u0442\u044E\u0440\u043D op. 48 \u2116 1",p:"\u041B\u044E\u043A \u0424\u043E\u043B\u043A\u043D\u0435\u0440"},{f:"music/beethoven-moonlight-1.mp3",t:"\u041B\u044E\u0434\u0432\u0438\u0433 \u0432\u0430\u043D \u0411\u0435\u0442\u0445\u043E\u0432\u0435\u043D \u2014 \xAB\u041B\u0443\u043D\u043D\u0430\u044F \u0441\u043E\u043D\u0430\u0442\u0430\xBB, I \u0447\u0430\u0441\u0442\u044C",p:"\u041F\u043E\u043B \u041F\u0438\u0442\u043C\u0430\u043D"}];function Np(r,e,t){let n=Math.round(r.sampleRate*e),i=r.createBuffer(2,n,r.sampleRate);for(let s=0;s<2;s++){let a=i.getChannelData(s);for(let o=0;o<n;o++){let l=o/n;a[o]=(Math.random()*2-1)*Math.pow(1-l,t)*(o<400?o/400:1)}}return i}function Hy(r,e,t){let n=Math.round(r.sampleRate*e),i=r.createBuffer(1,n,r.sampleRate),s=i.getChannelData(0),a=0;for(let o=0;o<n;o++){let l=Math.random()*2-1;t?(a=(a+.02*l)/1.02,s[o]=a*3.5):s[o]=l}return i}var Tl=class{constructor(e){this.url=e||(n=>n),this.ti=Math.floor(Math.random()*pa.length),this.fails=0,this.onTrack=null;let t="";try{t=localStorage.getItem(Up)||""}catch{}this.want=t==="on",this.on=!1,this.ctx=null,this.dist=0,this.big=!0}build(){let e=window.AudioContext||window.webkitAudioContext;if(!e)return!1;try{navigator.audioSession&&(navigator.audioSession.type="playback")}catch{}let t=this.ctx=new e;return this.master=t.createGain(),this.master.gain.value=0,this.master.connect(t.destination),this.revHall=t.createConvolver(),this.revHall.buffer=Np(t,2.8,3.2),this.revRoom=t.createConvolver(),this.revRoom.buffer=Np(t,1.5,4),this.wetHall=t.createGain(),this.wetRoom=t.createGain(),this.revHall.connect(this.wetHall).connect(this.master),this.revRoom.connect(this.wetRoom).connect(this.master),this.send=t.createGain(),this.send.gain.value=.55,this.send.connect(this.revHall),this.send.connect(this.revRoom),this.setRoom(!0,!0),this.musicGain=t.createGain(),this.musicGain.gain.value=.3,this.musicGain.connect(this.master),this.white=Hy(t,.3,!1),!0}toggle(){this.want=!this.on;try{localStorage.setItem(Up,this.want?"on":"off")}catch{}return this.set(this.want),this.on}set(e){if(e&&!this.ctx&&!this.build()||!this.ctx)return;e&&this.ctx.state==="suspended"&&this.ctx.resume(),this.on=e;let t=this.ctx.currentTime;this.master.gain.cancelScheduledValues(t),this.master.gain.setTargetAtTime(e?1:0,t,.25),clearTimeout(this.pauseT),e?this.play():this.audio&&(this.pauseT=setTimeout(()=>{this.on||this.audio.pause()},900))}play(){if(!this.audio){let t=this.audio=new Audio;t.crossOrigin="anonymous",t.preload="auto",this.ctx.createMediaElementSource(t).connect(this.musicGain),t.addEventListener("ended",()=>{this.fails=0,this.next(1500)}),t.addEventListener("error",()=>{++this.fails<pa.length&&this.next(2e3)}),t.addEventListener("playing",()=>{this.onTrack&&this.onTrack(pa[this.ti])}),this.load()}let e=this.audio.play();e&&e.catch&&e.catch(()=>{})}load(){this.audio.src=this.url(pa[this.ti].f)}next(e){clearTimeout(this.nextT),this.nextT=setTimeout(()=>{this.audio&&(this.ti=(this.ti+1)%pa.length,this.load(),this.on&&!document.hidden&&this.play())},e||0)}visible(e){!this.audio||!this.on||(e?this.play():this.audio.pause())}setRoom(e,t){if(!this.ctx||e===this.big&&!t)return;this.big=e;let n=this.ctx.currentTime;this.wetHall.gain.setTargetAtTime(e?.9:0,n,t?.01:.6),this.wetRoom.gain.setTargetAtTime(e?0:.75,n,t?.01:.6)}step(e){let t=this.ctx,n=t.currentTime,i=(.7+Math.random()*.3)*Math.min(1,.6+e*.08),s=t.createBufferSource();s.buffer=this.white,s.playbackRate.value=.7+Math.random()*.2;let a=t.createBiquadFilter();a.type="lowpass",a.frequency.value=500+Math.random()*150,a.Q.value=.5;let o=t.createGain();o.gain.setValueAtTime(0,n),o.gain.linearRampToValueAtTime(.022*i,n+.025),o.gain.exponentialRampToValueAtTime(5e-4,n+.16),s.connect(a).connect(o),o.connect(this.master),s.start(n),s.stop(n+.2);let l=t.createOscillator();l.type="sine",l.frequency.setValueAtTime(70+Math.random()*10,n),l.frequency.exponentialRampToValueAtTime(48,n+.1);let c=t.createGain();c.gain.setValueAtTime(0,n),c.gain.linearRampToValueAtTime(.018*i,n+.02),c.gain.exponentialRampToValueAtTime(5e-4,n+.14),l.connect(c),c.connect(this.master),l.start(n),l.stop(n+.16)}door(e,t){if(!this.on||!this.ctx||t>9)return;let n=this.ctx,i=n.currentTime,s=Math.max(.15,1-t/9),a=n.createBufferSource();a.buffer=this.white,a.loop=!0;let o=n.createBiquadFilter();o.type="bandpass",o.frequency.setValueAtTime(e?500:700,i),o.frequency.linearRampToValueAtTime(e?900:400,i+.9),o.Q.value=1.6;let l=n.createGain();l.gain.setValueAtTime(0,i),l.gain.linearRampToValueAtTime(.05*s,i+.15),l.gain.linearRampToValueAtTime(.035*s,i+.75),l.gain.linearRampToValueAtTime(0,i+.95),a.connect(o).connect(l),l.connect(this.master),l.connect(this.send),a.start(i),a.stop(i+1)}lightsOn(){if(!this.on||!this.ctx)return;let e=this.ctx,t=e.currentTime,n=e.createBufferSource();n.buffer=this.white;let i=e.createBiquadFilter();i.type="highpass",i.frequency.value=3e3;let s=e.createGain();s.gain.setValueAtTime(.035,t),s.gain.exponentialRampToValueAtTime(.001,t+.03),n.connect(i).connect(s),s.connect(this.master),s.connect(this.send),n.start(t),n.stop(t+.05)}update(e,t,n){if(!this.on||!this.ctx)return;this.setRoom(n);let i=t>0?e/t:0;if(i>6||i<.2){this.dist=Math.min(this.dist,.72*.6);return}this.dist+=e,this.dist>=.72&&(this.dist-=.72,this.step(i))}dispose(){clearTimeout(this.nextT),clearTimeout(this.pauseT),this.audio&&(this.audio.pause(),this.audio.removeAttribute("src"),this.audio.load()),this.ctx&&this.ctx.close()}};var ma=new P;function Cn(r,e,t,n,i,s){let a=2*Math.PI*i/4,o=Math.max(s-2*i,0),l=Math.PI/4;ma.copy(e),ma[n]=0,ma.normalize();let c=.5*a/(a+o),h=1-ma.angleTo(r)/l;return Math.sign(ma[t])===1?h*c:o/(a+o)+c+c*(1-h)}var gr=class extends dt{constructor(e=1,t=1,n=1,i=2,s=.1){if(i=i*2+1,s=Math.min(e/2,t/2,n/2,s),super(1,1,1,i,i,i),i===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let o=new P,l=new P,c=new P(e,t,n).divideScalar(2).subScalar(s),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,f=h.length/6,m=new P,b=.5/i;for(let g=0,p=0;g<h.length;g+=3,p+=2)switch(o.fromArray(h,g),l.copy(o),l.x-=Math.sign(l.x)*b,l.y-=Math.sign(l.y)*b,l.z-=Math.sign(l.z)*b,l.normalize(),h[g+0]=c.x*Math.sign(o.x)+l.x*s,h[g+1]=c.y*Math.sign(o.y)+l.y*s,h[g+2]=c.z*Math.sign(o.z)+l.z*s,u[g+0]=l.x,u[g+1]=l.y,u[g+2]=l.z,Math.floor(g/f)){case 0:m.set(1,0,0),d[p+0]=Cn(m,l,"z","y",s,n),d[p+1]=1-Cn(m,l,"y","z",s,t);break;case 1:m.set(-1,0,0),d[p+0]=1-Cn(m,l,"z","y",s,n),d[p+1]=1-Cn(m,l,"y","z",s,t);break;case 2:m.set(0,1,0),d[p+0]=1-Cn(m,l,"x","z",s,e),d[p+1]=Cn(m,l,"z","x",s,n);break;case 3:m.set(0,-1,0),d[p+0]=1-Cn(m,l,"x","z",s,e),d[p+1]=1-Cn(m,l,"z","x",s,n);break;case 4:m.set(0,0,1),d[p+0]=1-Cn(m,l,"x","y",s,e),d[p+1]=1-Cn(m,l,"y","x",s,t);break;case 5:m.set(0,0,-1),d[p+0]=Cn(m,l,"x","y",s,e),d[p+1]=1-Cn(m,l,"y","x",s,t);break}}};var Vy=new Te,Gy=new Wt,Xu=Math.PI*2;function Wy(r){return r*r*(3-2*r)}function qy(r){let e=At(new vt({vertexColors:!0,roughness:1,metalness:1}));return e.onBeforeCompile=t=>{t.uniforms.uGlow=r,t.vertexShader=`attribute vec3 rm;
varying vec3 vRM;
`+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vRM = rm;`),t.fragmentShader=`varying vec3 vRM;
uniform float uGlow;
`+t.fragmentShader.replace("#include <roughnessmap_fragment>",Be.roughnessmap_fragment.replace("float roughnessFactor = roughness;","float roughnessFactor = vRM.x;")).replace("#include <metalnessmap_fragment>",Be.metalnessmap_fragment.replace("float metalnessFactor = metalness;","float metalnessFactor = vRM.y;")).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance += vColor.rgb * vRM.z * uGlow;`)},e.customProgramCacheKey=()=>"artg-props",e}function Xy(r,e){let t=r.attributes.position.count,n=new Float32Array(t*3),i=new Float32Array(t*3);for(let s=0;s<t;s++)n[s*3]=e.color.r,n[s*3+1]=e.color.g,n[s*3+2]=e.color.b,i[s*3]=e.r,i[s*3+1]=e.m,i[s*3+2]=e.e;return r.setAttribute("color",new ut(n,3)),r.setAttribute("rm",new ut(i,3)),r}function jy(r){return r.some(e=>!e.index)&&(r=r.map(e=>e.index?e.toNonIndexed():e)),or(r,!1)}var kp=new Map,Al=class{constructor(e){this.w=e,this.time=0,this.doors=[],this.cams=[],this.uTime={value:0},this.glow={value:0},this.pm=qy(this.glow),this.m=this.materials(),this.g=this.geometries()}materials(){let e=n=>new vt(Object.assign({metalness:0},n)),t=(n,i,s,a=0)=>({desc:!0,color:new fe(n),r:i,m:s,e:a});return{steel:t(12567236,.32,1),alu:t(13948632,.3,1),chrome:t(15658734,.24,1),white:t(15855852,.48,0),black:t(1842204,.45,0),rubber:t(2302755,.92,0),red:t(11736861,.3,0),smoke:t(1382169,.2,.3),wire:t(2105376,.4,1),disc:[14971759,4095381,15774800,16052714,2763306].map(n=>t(n,.28,0)),glass:At(e({color:15266030,roughness:.12,transparent:!0,opacity:.16,depthWrite:!1,envMapIntensity:2.2})),frosted:At(e({color:16053488,roughness:.6,emissive:16775920,emissiveIntensity:.55})),led:t(16726570,.4,0,1)}}geometries(){let e=new er([new G(0,0),new G(.06,0),new G(.066,-.01),new G(.064,-.03),new G(.04,-.038),new G(0,-.04)],16),t=new er([new G(0,0),new G(.038,0),new G(.038,-.008),new G(.01,-.012),new G(.008,-.05),new G(.026,-.056),new G(.026,-.06),new G(0,-.06)],8),n=new er([new G(0,0),new G(.07,0),new G(.078,.02),new G(.078,.44),new G(.066,.48),new G(.03,.5),new G(.018,.53),new G(0,.53)],20);return{detector:e,sprinkler:t,bottle:n}}put(e,t,n,i,s,a=0,o=0,l=0){let c=this.piece(e,t,n,i,s,a,o,l);return this.w.geoMesh(c,t.desc?this.pm:t)}piece(e,t,n=0,i=0,s=0,a=0,o=0,l=0){let c=e.clone();return c.applyMatrix4(Vy.makeRotationFromEuler(Gy.set(o,a,l,"YXZ"))),c.translate(n,i,s),t.desc?Xy(c,t):c}solid(e){let t=new Ne(jy(e),this.pm);return e.forEach(n=>n.dispose()),t}rbox(e,t,n,i,s,a,o,l,c=0,h=0,u=1){return this.put(this.G(gr,e,t,n,u,i),s,a,o,l,c,h)}G(e,...t){let n=e.name+JSON.stringify(t),i=kp.get(n);return i||(i=new e(...t),kp.set(n,i)),i}box(e,t,n,i,s,a,o,l=0,c=0){return this.put(this.G(dt,e,t,n),i,s,a,o,l,c)}bench(e,t,n,i){let s=this.w,a=this.m,o=Math.cos(n),l=Math.sin(n),c=(h,u)=>[e+h*o+u*l,t-h*l+u*o];this.rbox(i,.05,.44,.012,s.mat.oak,e,.455,t,n,0,2),[-1,1].forEach(h=>{let u=h*(i/2-.2),[d,f]=c(u,0);this.box(.04,.43,.36,a.steel,d,.215,f,n),this.box(.06,.012,.4,a.rubber,d,.006,f,n)}),s.plane(i+.5,.95,s.mat.shadow,e,.004,t,n,-Math.PI/2)}extinguisher(e,t,n){let i=this.m,s=n>0?0:Math.PI,a=.2,o=.44,l=.74,c=.95,h=.014,u=t+n*a/2,d=m=>t+n*m;this.box(o,l,.01,i.white,e,c,d(.005),s),[-1,1].forEach(m=>{this.box(h,l,a,i.white,e+m*(o-h)/2,c,u,s),this.box(o,h,a,i.white,e,c+m*(l-h)/2,u,s),this.box(.03,l,.012,i.white,e+m*(o/2-.015),c,d(a),s),this.box(o,.03,.012,i.white,e,c+m*(l/2-.015),d(a),s)}),this.box(.012,.09,.016,i.chrome,e+.16,c,d(a+.01),s),this.box(o-.06,l-.06,.004,i.glass,e,c,d(a-.004),s),this.put(this.g.bottle,i.red,e-.03,.62,u),this.box(.035,.07,.035,i.black,e-.03,1.18,u),this.box(.12,.016,.022,i.chrome,e+.01,1.215,u,0,.12);let f=new Zr([new P(.03,1.17,0),new P(.1,1.12,0),new P(.12,.95,0),new P(.11,.78,0)]);this.put(this.G(Lo,f,10,.009,6),i.rubber,e-.03,0,u,s),this.put(this.G(Lt,.018,.012,.09,12),i.black,e+.08,.74,u),this.put(this.G(Lt,.079,.079,.16,10,1,!0,-.9,1.8),i.white,e-.03,.9,u,n>0?0:Math.PI),this.atlasSign(0,1,.2,.2,e,1.52,t+n*.004,s)}signAtlas(){if(this.atlasMat)return this.atlasMat;let e=sn(1280,256,t=>{t.fillStyle="#c8161d",t.fillRect(0,0,256,256),t.fillStyle="#fff",t.beginPath(),t.roundRect(96,70,64,150,18),t.fill(),t.fillRect(118,44,20,30),t.fillRect(70,40,70,14),t.beginPath(),t.moveTo(140,50),t.quadraticCurveTo(200,40,190,120),t.lineWidth=10,t.strokeStyle="#fff",t.stroke();for(let n=0;n<4;n++){let i=256*(n+1),s=(20.6+n*.5).toFixed(1),a=47+n*3%8;t.fillStyle="#c9d2c6",t.fillRect(i,0,256,200),t.fillStyle="#1d2a22",t.textAlign="right",t.font="600 78px "+Ze,t.fillText(s+"\xB0",i+236,88),t.font="500 56px "+Ze,t.fillText(a+"%",i+236,168)}});return this.atlasMat=At(new et({map:bi(e)})),this.atlasMat}atlasSign(e,t,n,i,s,a,o,l){let c=new wt(n,i),h=c.attributes.uv;for(let u=0;u<h.count;u++)h.setXY(u,(e+h.getX(u))/5,1-(1-h.getY(u))*t);this.put(c,this.signAtlas(),s,a,o,l)}sign(e,t,n,i,s,a,o,l=0){return this.put(this.G(wt,t,n),e,i,s,a,o,l)}hygrometer(e,t,n){let i=n>0?0:Math.PI;this.rbox(.13,.13,.03,.008,this.m.white,e,1.5,t+n*.015,i),this.atlasSign(1+Math.floor(Math.random()*4),200/256,.1,.078,e,1.505,t+n*.031,i)}exitSign(e,t,n,i){if(this.box(.4,.17,.05,this.m.white,e,t,n-Math.cos(i)*.025),!this.exitMat){let s=sn(512,224,(a,o,l)=>{a.fillStyle="#0e9a4a",a.fillRect(0,0,o,l),a.fillStyle="#fff",a.beginPath(),a.arc(80,52,18,0,Xu),a.fill(),a.lineWidth=16,a.lineCap="round",a.strokeStyle="#fff",a.beginPath(),a.moveTo(74,80),a.lineTo(64,140),a.lineTo(96,190),a.moveTo(64,140),a.lineTo(34,180),a.moveTo(72,96),a.lineTo(110,118),a.moveTo(72,96),a.lineTo(40,110),a.stroke(),a.font="700 84px "+Ze,a.textAlign="left",Xt(a,"\u0412\u042B\u0425\u041E\u0414",150,145,4)});this.exitMat=At(new et({map:bi(s),color:new fe(2.2,2.2,2.2)}))}this.sign(this.exitMat,.37,.16,e,t,n+Math.cos(i)*.002,i)}camera(e,t,n,i){let s=this.m,a=new Mt;a.position.set(e,t,n),a.rotation.y=i,this.put(this.G(Lt,.018,.018,.22,12),s.white,e,t-.11,n);let o=new Mt;o.position.set(0,-.24,0),o.add(this.solid([this.piece(this.G(gr,.1,.09,.24,1,.02),s.white,0,0,.06),this.piece(this.G(dt,.12,.012,.26),s.white,0,.052,.07),this.piece(this.G(Lt,.028,.028,.012,20),s.smoke,0,0,.186,0,Math.PI/2)])),o.rotation.x=.35,a.add(o),this.w.add(a),this.cams.push({head:o,base:0,phase:Math.random()*Xu,speed:.12+Math.random()*.06})}ceiling(e,t){let n=this.m,i=5,s=t.z0-1.2,a=t.z1+1.2;[-1,1].forEach(o=>{let l=qt(e,o);for(let c=s-1.5;c>a;c-=6)this.grille(l,i-.004,c);for(let c=s;c>a;c-=4.5)this.put(this.g.sprinkler,n.chrome,l+o*.9,i,c);this.detector(l-o*.8,i,(t.z0+t.z1)/2)})}detector(e,t,n){this.put(this.g.detector,this.m.white,e,t,n),this.put(this.G(tr,.005,8,6),this.m.led,e+.03,t-.041,n)}grille(e,t,n){let i=this.m;this.box(.18,.01,1.2,i.black,e,t,n);for(let s=-3;s<=3;s++)this.box(.012,.012,1.18,i.white,e+s*.022,t-.006,n)}room(e,t){this.roomSteps(e,t).forEach(n=>n())}roomSteps(e,t){return[()=>this.benches(e,t),()=>this.ceiling(e,t),()=>this.fixtures(e,t)]}benches(e,t){let i=this.w.plan;[t.spine0+.62,t.spine1-.62].forEach(s=>{this.bench(e.cx,s,0,1.9),i.block.push({x0:e.cx-1.9/2-.35,x1:e.cx+1.9/2+.35,z0:s-.5,z1:s+.5})})}fixtures(e,t){this.camera(e.cx-_t/2+.35,5-.02,t.z0-.4,Math.PI*.75),t.idx===0&&this.exitSign(e.cx+Tt/2+.6,3.1,t.z0-.002,Math.PI);let n=e.cx-_t/2,i=e.cx+_t/2,s=qt(e,-1),a=qt(e,1),o=(n+s-Dt/2)/2,l=(a+Dt/2+i)/2;t.idx<e.rooms.length-1&&this.extinguisher(t.idx%2?l:o,t.z1,1),t.idx>0&&this.hygrometer(e.cx+.9,e.rooms[t.idx-1].z1-He,-1)}hall(){let e=this.w,t=e.plan,n=t.hall,i=this.m;t.corridors.forEach(o=>this.slidingDoor(o.cx,n.z0+He/2+.09)),t.corridors.forEach(o=>{let l=o.cx+Tt/2+.9,c=n.z0+.55;this.put(this.G(Lt,.17,.16,.62,28,1,!0),i.steel,l,.31,c),this.put(this.G(Lt,.155,.155,.02,28),i.black,l,.6,c),this.put(new Io(.165,.008,8,28).rotateX(Math.PI/2),i.steel,l,.62,c),t.block.push({x0:l-.35,x1:l+.35,z0:c-.35,z1:c+.35})});let s=n.z1;this.box(2.5,2.9,.06,i.alu,0,1.45,s-.03),[-1,1].forEach(o=>{this.box(1.14,2.74,.02,i.frosted,o*.59,1.43,s-.065),this.box(.03,.6,.03,i.chrome,o*.14,1.1,s-.1)}),this.exitSign(0,3.25,s-.03,Math.PI),this.kiosk(n.x1-2,n.z1-3.6,-Math.PI/2),t.block.push({x0:n.x1-2.5,x1:n.x1-1.5,z0:n.z1-4.1,z1:n.z1-3.1});let a=n.x0+1.5;this.rbox(.6,.36,.025,.01,i.black,a-.15,1.36,1.7,Math.PI/2),this.box(.04,.2,.04,i.alu,a-.13,1.18,1.7),this.box(.22,.01,.18,i.alu,a-.13,1.095,1.7),this.brochures(a+.3,3.3);for(let o=n.x0+3;o<n.x1-2;o+=4.5)this.put(this.g.sprinkler,i.chrome,o,n.h,-3.5),this.put(this.g.sprinkler,i.chrome,o,n.h,3.5);this.detector(-4,n.h,0),this.detector(4,n.h,0),this.camera(n.x0+.4,n.h-.02,n.z1-.4,Math.PI*.25+Math.PI),this.camera(n.x1-.4,n.h-.02,n.z0+.4,-Math.PI*.25)}brochures(e,t){let n=this.m;this.box(.06,.26,.5,n.glass,e,1.22,t);let i=["#e4736f","#3e7d95","#f0b450"],s=sn(384,180,(o,l,c)=>{i.forEach((h,u)=>{let d=u*128;o.fillStyle=h,o.fillRect(d,0,128,c),o.fillStyle="#fff",o.font="600 20px "+Ze,o.fillText("\u0410\u0420\u0422-",d+12,40),o.fillText("\u0420\u041E\u0421\u0422\u041E\u0412",d+12,64),o.font="400 14px "+Ze,o.fillText("2027",d+12,160)})}),a=At(new vt({map:bi(s),roughness:.5}));i.forEach((o,l)=>{let c=new wt(.1,.14),h=c.attributes.uv;for(let u=0;u<h.count;u++)h.setX(u,(l+h.getX(u))/3);this.put(c,a,e+.02,1.2,t-.16+l*.16,Math.PI/2,-.25)})}kiosk(e,t,n){let i=this.m;this.rbox(.5,.02,.4,.008,i.alu,e,.01,t,n),this.box(.07,1,.07,i.alu,e,.5,t,n);let s=sn(512,720,(l,c,h)=>{l.fillStyle="#16181a",l.fillRect(0,0,c,h),l.fillStyle="#fff",l.font="300 34px "+Ze,Xt(l,"\u041F\u041B\u0410\u041D \u0412\u042B\u0421\u0422\u0410\u0412\u041A\u0418",36,70,5),l.strokeStyle="rgba(255,255,255,.7)",l.lineWidth=3,l.strokeRect(60,520,c-120,120),l.strokeRect(80,140,150,370),l.strokeRect(c-230,140,150,370);for(let u=140;u<510;u+=46)l.beginPath(),l.moveTo(80,u),l.lineTo(230,u),l.moveTo(c-230,u),l.lineTo(c-80,u),l.stroke();l.fillStyle="#e4736f",l.beginPath(),l.arc(c/2+60,600,12,0,Xu),l.fill(),l.fillStyle="rgba(255,255,255,.8)",l.font="400 24px "+Ze,l.fillText("\u0412\u044B \u0437\u0434\u0435\u0441\u044C",c/2+84,608),l.fillText("\u0410\u0440\u0442-\u0441\u0430\u043B\u043E\u043D",86,130),l.fillText("\u0413\u0430\u043B\u0435\u0440\u0435\u0438",c-224,130)}),a=Math.cos(n),o=Math.sin(n);this.rbox(.62,.86,.06,.02,i.black,e+o*.02,1.35,t+a*.02,n,-.25),this.sign(new et({map:bi(s),color:new fe(1.3,1.3,1.3)}),.54,.76,e+o*.055,1.35,t+a*.055,n,-.25)}slidingDoor(e,t){let n=this.m,i=new Mt;i.position.set(e,0,t),i.add(this.solid([this.piece(this.G(gr,Tt+.5,.2,.14,2,.02),n.alu,0,Gt+.1,.02)]));let s=Tt/2+.04,a=Gt-.03,o=[-1,1].map(c=>{let h=new Mt,u=new Ne(new dt(s-.05,a-.1,.012),n.glass);return u.position.y=a/2,h.add(u),h.add(this.solid([this.piece(this.G(dt,.035,a,.04),n.alu,-s/2+.0175,a/2,0),this.piece(this.G(dt,.035,a,.04),n.alu,s/2-.0175,a/2,0),this.piece(this.G(dt,s,.07,.04),n.alu,0,.035,0),this.piece(this.G(dt,s,.04,.04),n.alu,0,a-.02,0)])),i.add(h),{leaf:h,s:c}}),l=this.w.target;this.w.target=this.w.hallNorth,this.w.add(i),this.w.target=l,this.doors.push({cx:e,z:t,leaves:o,open:0,pw:s,was:0}),this.placeDoor(this.doors[this.doors.length-1])}placeDoor(e){let t=Wy(e.open);e.leaves.forEach(({leaf:n,s:i})=>{n.position.x=i*(e.pw/2-.02+t*(e.pw-.12))})}screen(e,t){let n=this.w,i=n.plan.hall,s=5.2,a=s*9/16,o=3.1,l=i.z0+He/2+.07,c=n.target;n.target=n.hallGroup,this.rbox(s+.14,a+.14,.08,.02,this.m.black,0,o,l-.03,0,0,2);let h={tA:{value:null},tB:{value:null},aA:{value:1},aB:{value:1},mixv:{value:0},time:{value:0},kA:{value:1},kB:{value:1},tText:{value:null},scr:{value:s/a},fA:{value:0},fB:{value:0},prog:{value:0}},u=new st({uniforms:h,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        uniform sampler2D tA, tB, tText; uniform float aA, aB, mixv, time, kA, kB, scr, fA, fB, prog; varying vec2 vUv;
        vec3 blob(vec2 uv, vec2 p, float r){ return vec3(smoothstep(r, 0.0, length((uv - p) * vec2(scr, 1.0)))); }
        vec3 bg(vec2 uv){
          vec3 c = vec3(0.05, 0.045, 0.045);
          c += vec3(0.89, 0.45, 0.43) * 0.55 * blob(uv, vec2(0.25 + 0.12 * sin(time * 0.21), 0.45 + 0.15 * cos(time * 0.17)), 0.9);
          c += vec3(0.24, 0.49, 0.58) * 0.55 * blob(uv, vec2(0.78 + 0.1 * cos(time * 0.13), 0.62 + 0.12 * sin(time * 0.19)), 1.0);
          c += vec3(0.94, 0.71, 0.31) * 0.40 * blob(uv, vec2(0.55 + 0.15 * sin(time * 0.11), 0.18), 0.7);
          return c;
        }
        vec4 art(sampler2D t, float aspect, float k, float on, float flip){
          vec2 size = vec2(0.8 * aspect / scr, 0.8);
          if (size.x > 0.45) size *= 0.45 / size.x;
          vec2 ctr = vec2(0.71, 0.5);
          vec2 p = (vUv - ctr) / size / k + 0.5;
          float inside = step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0);
          vec2 q = (vUv - ctr) / (size * k);
          float mat = step(abs(q.x), 0.5 + 0.018 / size.x) * step(abs(q.y), 0.5 + 0.018 / size.y);   // \u0431\u0435\u043B\u043E\u0435 \u043F\u0430\u0441\u043F\u0430\u0440\u0442\u0443
          vec2 tp = vec2(p.x, mix(p.y, 1.0 - p.y, flip));          // \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 \u0438\u0437 ImageBitmap \u0438\u0434\u0451\u0442 \u0441\u0432\u0435\u0440\u0445\u0443 \u0432\u043D\u0438\u0437
          vec3 col = mix(vec3(0.95), texture2D(t, clamp(tp, 0.0, 1.0)).rgb, inside);
          return vec4(col, mat * on);
        }
        void main(){
          vec3 c = bg(vUv);
          vec4 a = art(tA, aA, kA, 1.0 - mixv, fA);
          vec4 b = art(tB, aB, kB, mixv, fB);
          c = mix(c, a.rgb, a.a);
          c = mix(c, b.rgb, b.a);
          vec4 tx = texture2D(tText, vUv);
          c = mix(c, tx.rgb, tx.a);
          // \u043F\u043E\u043B\u043E\u0441\u043A\u0430 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0441\u043B\u0430\u0439\u0434\u0430 \u043F\u043E\u0434 \u0438\u043C\u0435\u043D\u0435\u043C \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0430
          float bar = step(0.047, vUv.x) * step(vUv.x, 0.047 + 0.3 * prog) * step(abs(vUv.y - 0.045), 0.0035);
          float rail = step(0.047, vUv.x) * step(vUv.x, 0.347) * step(abs(vUv.y - 0.045), 0.0035);
          c = mix(c, vec3(1.0), rail * 0.18 + bar * 0.7);
          gl_FragColor = vec4(c * 1.35, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`}),d=new Ne(new wt(s,a),u);d.position.set(0,o,l+.012),n.add(d),this.screenLight=new sr(16777215,1.4,s,a),this.screenLight.position.set(0,o,l+.05),this.screenLight.lookAt(0,o,l+5),this.screenLight.visible=!!n.ltcReady&&n.level!=="eco",n.areaLights.push(this.screenLight),n.add(this.screenLight),n.target=c,this.scr={U:h,bridge:e,tex:t,next:0,pool:null,busy:!1,textCv:null};let f=document.createElement("canvas");f.width=1024,f.height=576,this.scr.textCv=f,h.tText.value=new en(f),h.tText.value.colorSpace=je;let m=new Sn(new Uint8Array([40,36,34,255]),1,1);m.needsUpdate=!0,h.tA.value=h.tB.value=m,this.caption("")}caption(e){let t=this.scr.textCv,n=t.getContext("2d");if(n.clearRect(0,0,t.width,t.height),n.fillStyle="rgba(255,255,255,0.96)",n.font="300 46px "+Ze,Xt(n,"\u0410\u0420\u0422-\u0420\u041E\u0421\u0422\u041E\u0412",48,92,6),n.font="600 46px "+Ze,Xt(n,"2027",48,146,6),n.font="400 19px "+Ze,n.fillStyle="rgba(255,255,255,0.72)",Xt(n,"\u0412\u042B\u0421\u0422\u0410\u0412\u041A\u0410-\u041F\u0420\u041E\u0414\u0410\u0416\u0410",50,192,4),Xt(n,"\u0421\u041E\u0412\u0420\u0415\u041C\u0415\u041D\u041D\u041E\u0413\u041E \u0418\u0421\u041A\u0423\u0421\u0421\u0422\u0412\u0410",50,218,4),e){n.font="400 17px "+Ze,n.fillStyle="rgba(255,255,255,0.6)",Xt(n,"\u0421\u0415\u0419\u0427\u0410\u0421 \u041D\u0410 \u042D\u041A\u0420\u0410\u041D\u0415",50,t.height-118,3),n.fillStyle="rgba(255,255,255,0.95)";let i=Yn(n,e,380,{size:28,min:20,maxLines:2});i.lines.forEach((s,a)=>n.fillText(s,48,t.height-80+a*(i.size+6)-(i.lines.length>1?0:-16)))}this.scr.U.tText.value.needsUpdate=!0}nextSlide(){let e=this.scr;if(e.busy||(e.pool||(e.pool=[],e.bridge.artists.forEach((n,i)=>(n.works||[]).forEach(s=>{s.medium&&e.pool.push({gi:i,w:s})}))),!e.pool.length))return;let t=e.pool[Math.floor(Math.random()*e.pool.length)];e.busy=!0,e.tex.fetchImage(e.bridge.url(t.w.medium)).then(n=>{let i=e.tex.makeTexture(n);i.generateMipmaps=!0;let s=e.U;e.old&&e.old.dispose(),e.old=s.tA.value.isDataTexture?null:s.tA.value,s.tA.value=s.tB.value,s.aA.value=s.aB.value,s.kA.value=s.kB.value,s.fA.value=s.fB.value,s.tB.value=i,s.aB.value=(n.width||1)/(n.height||1),s.fB.value=i.userData.topDown?1:0,s.mixv.value=0,e.shownAt=this.time,this.caption(e.bridge.artists[t.gi].name),e.busy=!1},()=>{e.busy=!1,e.next=this.time+1})}sculpture(){let e=this.w,t=e.plan.hall,n=this.m,i=e.target;e.target=e.hallGroup;let s=new Mt;s.position.set(0,t.h,1.2),e.add(s);let a=(d,f=0,m=0)=>this.piece(this.G(Lt,.003,.003,d,6),n.wire,f,m-d/2,0),o=(d,f,m,b)=>this.piece(this.G(Lt,d,d,.012,48),f,m,b,0,0,Math.PI/2);this.put(this.G(Lt,.003,.003,.9,6),n.wire,0,t.h-.45,1.2);let l=[],c=s,h=.9;[[2.6,.42,0,.55],[2,.33,1,.55],[1.5,.26,2,.55],[1.1,.2,4,0]].forEach(([d,f,m,b],g)=>{let p=new Mt;p.position.y=-h,c.add(p);let _=-d*.32,v=[this.piece(this.G(Lt,.004,.004,d,6),n.wire,d*.18,0,0,0,0,Math.PI/2)];b?v.push(a(b,_)):v.push(a(.3,_),o(.16,n.disc[3],_,-.46));let x=this.solid(v);x.castShadow=!0,p.add(x);let E=new Mt;E.position.set(d*.68,0,0);let w=this.solid([a(.35),o(f,n.disc[m],0,-.35-f)]);w.castShadow=!0,E.add(w),p.add(E);let T=new Mt;T.position.set(_,0,0),p.add(T),l.push({bar:p,holder:E,d:w,w:.09+g*.05,a:.6+g*.25,ph:g*1.7,drift:(g%2?-1:1)*.03}),c=T,h=b}),e.target=i,this.mobile=l}reflectMats(){let e=this.m;return[this.pm,e.glass]}swayPlants(e){let t=this.uTime;e.onBeforeCompile=n=>{n.uniforms.uTime=t,n.vertexShader=`uniform float uTime;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float hh = clamp(uv.y, 0.0, 1.0); hh *= hh;
        transformed.x += sin(uTime * 1.3 + position.y * 3.0 + position.x * 5.0) * 0.022 * hh;
        transformed.z += cos(uTime * 1.1 + position.x * 4.0) * 0.016 * hh;`)},e.needsUpdate=!0}update(e,t,n,i){this.time+=e;let s=this.time;this.uTime.value=s;for(let o of this.doors){let l=Math.hypot(t.x-o.cx,t.z-o.z),c=l<4.2+Math.min(n,30)*.9?1:0,h=e/.95;o.open=c?Math.min(1,o.open+h):Math.max(0,o.open-h*.8),c!==o.was&&this.onDoor&&this.onDoor(c,l),o.was=c,this.placeDoor(o)}for(let o of this.cams)o.head.rotation.y=Math.sin(s*o.speed+o.phase)*.7;let a=s%4<.08?1:.05;if(this.glow.value=6*a,this.mobile&&this.mobile.forEach(o=>{o.bar.rotation.y=Math.sin(s*o.w+o.ph)*o.a+s*o.drift,o.bar.rotation.z=Math.sin(s*o.w*1.7+o.ph)*.025,o.holder.rotation.y=Math.sin(s*o.w*.8+o.ph*2)*1.2}),this.scr){let o=this.scr,l=o.U;if(l.time.value=s,s>=o.next&&this.w.hallGroup.visible&&(o.next=s+7,this.nextSlide()),l.mixv.value=Math.min(1,l.mixv.value+e/1.4),l.kB.value=1+Math.min(1,(s-(o.shownAt||0))/8.4)*.05,l.kA.value=1.05,l.prog.value=o.shownAt==null?0:Math.min(1,(s-o.shownAt)/7),this.screenLight){let c=.5+.5*Math.sin(s*.2);this.screenLight.color.setRGB(.9+.1*c,.7+.1*(1-c),.62+.25*(1-c))}}this.roomLights(e,i,t)}roomLights(e,t,n){let i=this.w.plan;for(let s of i.corridors)for(let a of s.rooms){if(!a.group)continue;a.lit==null&&(a.lit=.2,a.wave=1);let o=t&&t.sectionRef===s&&Math.abs(t.idx-a.idx)===1,l=!t&&a.idx===0,c=a===t?1:o||l?.32:.2;c===1&&a.lit<.5&&!a.waking&&(a.waking=!0,a.wave=0,a.entryZ=n.z,this.onWake&&this.onWake()),c<1&&(a.waking=!1),a.wave=Math.min(1.6,a.wave+e/1.6);let h=c>a.lit?e/.9:e/3.5;a.lit+=Math.max(-h,Math.min(h,c-a.lit));let u=.12+.88*a.lit;a.lightMat&&a.lightMat.color.copy(a.lightBase).multiplyScalar(u),a.lensMat&&a.lensMat.color.copy(a.lensBase).multiplyScalar(u)}}spotFactor(e){let t=this.w.plan.corridors[e.room],n=t&&t.rooms[e.sub];if(!n||n.lit==null)return 1;if(!n.waking)return n.lit;let i=Math.abs(e.z-(n.entryZ==null?n.z0:n.entryZ)),s=Math.max(0,Math.min(1,(n.wave*22-i)/3));return Math.max(.2,n.lit*s)}};var ji=1.66,Fp=513/1200,Rl=.9;function Yy(r){return r.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace("#include <map_fragment>",`#ifdef USE_MAP
      vec4 sampledDiffuseColor = texture2D( map, vec2( vMapUv.x, 0.5 + vMapUv.y * 0.5 ) );
      // \u043C\u0430\u0441\u043A\u0430: \u0431\u0435\u0437 \u0440\u0430\u0441\u0442\u044F\u0436\u043A\u0438 \u0432\u0438\u0434\u0435\u043E \u0432 \xAB\u0443\u0437\u043A\u043E\u043C\xBB \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u044F\u0440\u043A\u043E\u0441\u0442\u0438 (\u0431\u0435\u043B\u043E\u0435 = 235)
      // \u0434\u0430\u0432\u0430\u043B\u043E ~0.9 \u2014 \u0444\u0438\u0433\u0443\u0440\u0430 \u0432\u044B\u0445\u043E\u0434\u0438\u043B\u0430 \u043F\u043E\u043B\u0443\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0439; \u0432\u0441\u0451 \u0432\u044B\u0448\u0435 \u043F\u043E\u0440\u043E\u0433\u0430 \u2014 \u043D\u0435\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E,
      // \u043C\u044F\u0433\u043A\u0438\u043C \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u0440\u0430\u0439
      float matte = smoothstep( 0.1, 0.75, texture2D( map, vec2( vMapUv.x, vMapUv.y * 0.5 ) ).g );
      #ifdef DECODE_VIDEO_TEXTURE
        sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
      #endif
      sampledDiffuseColor.a = matte;
      diffuseColor *= sampledDiffuseColor;
    #endif`)},r.customProgramCacheKey=()=>"curator-stacked-alpha",r}function Op(r,e){return new st({uniforms:{map:{value:r}},vertexShader:`varying vec2 vUv; varying vec3 vN;
void main() { vUv = uv; vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform sampler2D map; varying vec2 vUv; varying vec3 vN;
void main() {
`+(e?`  float a = texture2D(map, vec2(vUv.x, vUv.y * 0.5)).g;
`:`  float a = texture2D(map, vUv).a;
`)+`  if (a < 0.5) discard;
  vec3 n = normalize(vN); if (!gl_FrontFacing) n = -n;
  gl_FragColor = vec4(n * 0.5 + 0.5, 1.0);
}`,side:Ht})}function Ky(r){return r.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
  diffuseColor.a = smoothstep( 0.1, 0.75, diffuseColor.a );`)},r.customProgramCacheKey=()=>"curator-solid-alpha",r}function Zy(){let r=document.createElement("canvas");r.width=128,r.height=64;let e=r.getContext("2d");e.setTransform(2,0,0,1,0,0);let t=e.createRadialGradient(32,32,1,32,32,31);t.addColorStop(0,"rgba(30,24,16,0.42)"),t.addColorStop(.5,"rgba(30,24,16,0.18)"),t.addColorStop(1,"rgba(30,24,16,0)"),e.fillStyle=t,e.fillRect(0,0,64,64);let n=new en(r);return n.colorSpace=je,n}var Cl=class{constructor(e,t){let n=e.plan,i=n.hall,s=n.corridors[0],a=-.9,o=i.z0+8.5;this.pos=new P(a,0,o),this.v=new P,this.ready=!1;let l=new Xn().setCrossOrigin("anonymous").load(t.url("curator/figure.webp"),u=>{this.ready=!0,this.mask=this.alphaMask(u.image)});l.colorSpace=je,l.anisotropy=e.aniso;let c=new wt(ji*Fp,ji).translate(0,ji/2,0);this.mesh=new Ne(c,Ky(new et({map:l,transparent:!0,alphaTest:.08,toneMapped:!1}))),this.mesh.position.copy(this.pos),this.mesh.userData.curator=!0,this.mesh.userData.noAO=!0,this.mesh.userData.aoCutout=Op(l,!1);let h=new Ne(new wt(1.1,.55).rotateX(-Math.PI/2),new et({map:Zy(),transparent:!0,depthWrite:!1,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-2}));h.position.set(a,.006,o+.04),h.userData.noAO=!0,e.hallGroup.add(this.mesh,h),this.makeVideo(e,t),e.pickables.push(this.mesh),n.block.push({x0:a-.5,x1:a+.5,z0:o-.45,z1:o+.45})}makeVideo(e,t){if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches||!t.url)return;let i=document.createElement("video");i.crossOrigin="anonymous",i.muted=!0,i.defaultMuted=!0,i.loop=!0,i.playsInline=!0,i.setAttribute("playsinline",""),i.setAttribute("muted",""),i.preload="metadata";let s=new yo(i);s.colorSpace=je;let a=Yy(new et({map:s,transparent:!0,alphaTest:.08,toneMapped:!1})),o=new Ne(new wt(ji*Fp/Rl,ji/Rl).translate(0,ji/Rl/2,0),a);o.position.copy(this.pos),o.visible=!1,o.userData.noAO=!0,o.userData.aoCutout=Op(s,!0),e.hallGroup.add(o),this.video={v:i,mesh:o,tex:s,ok:!1,broken:!1,pending:!1,blocked:!1},i.addEventListener("loadedmetadata",()=>{let u=i.videoWidth/(i.videoHeight/2);if(!u)return;let d=ji/Rl;o.geometry.dispose(),o.geometry=new wt(d*u,d).translate(0,d/2,0)}),i.addEventListener("playing",()=>{this.video.ok=!0}),i.addEventListener("error",()=>{this.video.broken=!0});let l=navigator.userAgent,h=!(/iPhone|iPad|iPod/.test(l)||/Macintosh/.test(l)&&navigator.maxTouchPoints>1||/Safari/.test(l)&&!/Chrome|Chromium|CriOS|Edg|OPR|YaBrowser|Firefox|FxiOS/.test(l))&&i.canPlayType('video/webm; codecs="vp9"');i.src=t.url(h?"curator/idle.webm":"curator/idle.mp4")}play(e){let t=this.video;if(!t||t.broken)return;if(e&&t.v.paused&&!t.pending&&!t.blocked){t.pending=!0;let i=t.v.play(),s=()=>{t.pending=!1};i&&i.then?i.then(s,()=>{s(),t.blocked=!0}):s()}else!e&&!t.v.paused&&t.v.pause();let n=!!(e&&t.ok&&!t.v.paused&&t.v.readyState>=2);t.mesh.visible=n,this.mesh.material.visible=!n}unblock(){this.video&&(this.video.blocked=!1)}dispose(){let e=this.video;e&&(e.v.pause(),e.v.removeAttribute("src"),e.v.load(),e.tex.dispose())}alphaMask(e){try{let i=document.createElement("canvas");i.width=24,i.height=56;let s=i.getContext("2d");s.drawImage(e,0,0,24,56);let a=s.getImageData(0,0,24,56).data,o=new Uint8Array(1344);for(let l=0;l<o.length;l++)o[l]=a[l*4+3];return{w:24,h:56,m:o}}catch{return null}}hit(e){let t=this.mask;if(!t||!e)return!0;let n=Math.min(t.w-1,Math.max(0,Math.floor(e.x*t.w))),i=Math.min(t.h-1,Math.max(0,Math.floor((1-e.y)*t.h)));for(let s=-1;s<=1;s++)for(let a=-1;a<=1;a++){let o=n+a,l=i+s;if(o>=0&&l>=0&&o<t.w&&l<t.h&&t.m[l*t.w+o]>60)return!0}return!1}face(e){this.mesh.rotation.y=Math.atan2(e.position.x-this.pos.x,e.position.z-this.pos.z),this.video&&(this.video.mesh.rotation.y=this.mesh.rotation.y)}head(e,t,n){let i=this.v.set(this.pos.x,ji+.08,this.pos.z),s=Math.hypot(e.position.x-this.pos.x,e.position.z-this.pos.z);return i.project(e),i.z>1||i.z<-1?null:{x:(i.x+1)/2*t,y:(1-i.y)/2*n,d:s}}};var Bp=`
.artg-stage{position:relative;z-index:1;max-width:1160px;margin:0 auto;height:clamp(480px,80vh,760px);
  border-radius:22px;overflow:hidden;background:#ecebe8;touch-action:none;user-select:none;-webkit-user-select:none;
  outline:none;box-shadow:0 18px 50px rgba(0,0,0,.14);font-family:"Helvetica Neue",Arial,sans-serif}
.artg-stage:focus-visible{box-shadow:0 0 0 2px #2a2a2a,0 18px 50px rgba(0,0,0,.14)}
.artg-canvas{display:block;width:100%;height:100%}
.artg-top{position:absolute;left:14px;right:14px;top:12px;display:flex;justify-content:space-between;
  align-items:flex-start;gap:10px;pointer-events:none}
.artg-where{pointer-events:none;color:#2a2a2a;line-height:1.25;min-width:0}
.artg-where b{display:block;font:500 13px/1.3 "Inter","Helvetica Neue",Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}
.artg-where span{font-size:14px;color:#6f6f6b;max-width:min(48vw,520px);line-height:1.3;
  display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}
.artg-actions{display:flex;gap:8px;pointer-events:auto;flex-shrink:0}
.artg-btn--icon{width:42px;height:42px;padding:0;justify-content:center}
.artg-btn{appearance:none;border:0;border-radius:999px;background:rgba(255,255,255,.9);color:#2a2a2a;
  font:500 14px/1 "Inter","Helvetica Neue",Arial,sans-serif;padding:10px 15px;cursor:pointer;box-shadow:0 1px 0 rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.08);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.artg-btn:hover{background:#fff}
.artg-btn:focus-visible{outline:2px solid #2a2a2a;outline-offset:2px}
.artg-btn--icon{padding:8px 10px;display:flex;align-items:center}
.artg-btn{display:inline-flex;align-items:center;gap:7px}
.artg-btn svg{flex-shrink:0}
.artg-where b{white-space:nowrap}
/* \u0438\u043C\u044F \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0430 \u0432 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0435 \u2014 \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0435\u0433\u043E \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 */
.artg-where span.is-link{pointer-events:auto;cursor:pointer;text-decoration:underline;text-decoration-color:rgba(42,42,42,.3);text-underline-offset:3px}
.artg-where span.is-link:hover{color:#2a2a2a;text-decoration-color:#2a2a2a}
/* \u043D\u0438\u0437\u043A\u0438\u0439 \u044D\u043A\u0440\u0430\u043D (\u0442\u0435\u043B\u0435\u0444\u043E\u043D \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u043E): \u0441\u0446\u0435\u043D\u0430 \u043D\u0435 \u0432\u044B\u0448\u0435 \u044D\u043A\u0440\u0430\u043D\u0430 */
@media (max-height:520px){.artg-stage{height:calc(100vh - 24px);height:calc(100svh - 24px);min-height:260px}
  .artg-stage .artg-map__plan{width:auto;height:96px;align-self:center}}
.artg-stage.is-narrow .artg-hint{font-size:13px;padding:8px 12px;max-width:calc(100% - 28px)}
/* \u043C\u0435\u043D\u044E: \u043A\u043E\u043B\u043E\u043D\u043A\u0430 \u043F\u043E \u043F\u0440\u0430\u0432\u043E\u043C\u0443 \u043A\u0440\u0430\u044E \u043F\u043E\u0434 \u043A\u043D\u043E\u043F\u043A\u043E\u0439 \u2014 \u043A\u0440\u0443\u0433\u043B\u0430\u044F \u0438\u043A\u043E\u043D\u043A\u0430 \u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u044C */
.artg-menu-btn .artg-ico-close{display:none}
.artg-stage.is-menu .artg-menu-btn{background:#2a2a2a;color:#fff}
.artg-stage.is-menu .artg-menu-btn .artg-ico-menu{display:none}
.artg-stage.is-menu .artg-menu-btn .artg-ico-close{display:block}
/* \u043A\u043D\u043E\u043F\u043A\u0438 \u0441 \u043F\u043E\u0434\u043F\u0438\u0441\u044C\u044E: \xAB\u041F\u043E\u043B\u043D\u044B\u0439 \u044D\u043A\u0440\u0430\u043D\xBB / \xAB\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C\xBB, \xAB\u041C\u0435\u043D\u044E\xBB / \xAB\u0417\u0430\u043A\u0440\u044B\u0442\u044C\xBB */
.artg-tbtn{height:42px;padding:0 16px 0 13px;white-space:nowrap}
.artg-t--out{display:none}
.artg-stage.is-fs .artg-fs-btn .artg-t--in,.artg-stage.is-menu .artg-menu-btn .artg-t--in{display:none}
.artg-stage.is-fs .artg-fs-btn .artg-t--out,.artg-stage.is-menu .artg-menu-btn .artg-t--out{display:inline}
.artg-stage.is-narrow .artg-tbtn{height:38px;padding:0 12px 0 10px;font-size:13px;gap:6px}
.artg-stage.is-narrow .artg-tbtn svg{width:18px;height:18px}
/* \u0442\u0435\u043B\u0435\u0444\u043E\u043D: \u043A\u043D\u043E\u043F\u043A\u0438 \u2014 \u0432\u0435\u0440\u0445\u043D\u0438\u043C \u0440\u044F\u0434\u043E\u043C \u0441\u043F\u0440\u0430\u0432\u0430, \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043B\u0430 \u2014 \u0441\u0442\u0440\u043E\u043A\u043E\u0439 \u043F\u043E\u0434 \u043D\u0438\u043C\u0438 */
.artg-stage.is-narrow .artg-top{flex-wrap:wrap;row-gap:6px}
.artg-stage.is-narrow .artg-where{order:2;flex:1 1 100%}
.artg-stage.is-narrow .artg-actions{margin-left:auto}
.artg-stage.is-narrow .artg-where span{max-width:100%}
.artg-menu{position:absolute;right:14px;top:62px;z-index:3;display:flex;flex-direction:column;align-items:flex-end;gap:8px;
  max-height:calc(100% - 76px);overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;padding:2px 2px 4px;margin:-2px -2px 0;
  scrollbar-width:none;pointer-events:auto}
.artg-menu::-webkit-scrollbar{display:none}
.artg-menu[hidden]{display:none}
.artg-mi{appearance:none;border:0;background:none;padding:0;margin:0;display:flex;align-items:center;gap:10px;cursor:pointer;flex-shrink:0;color:#2a2a2a;font:500 14px/1.2 "Inter","Helvetica Neue",Arial,sans-serif;
  animation:artg-mi-in .22s cubic-bezier(.2,.8,.2,1) both}
.artg-mi__t{background:rgba(255,255,255,.94);padding:8px 12px;border-radius:999px;white-space:nowrap;
  box-shadow:0 1px 0 rgba(0,0,0,.05),0 4px 14px rgba(0,0,0,.08)}
.artg-mi__i{width:42px;height:42px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;
  background:rgba(255,255,255,.94);box-shadow:0 1px 0 rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.1)}
.artg-mi:hover .artg-mi__i,.artg-mi:hover .artg-mi__t{background:#fff}
.artg-mi:focus-visible{outline:none}
.artg-mi:focus-visible .artg-mi__i{outline:2px solid #2a2a2a;outline-offset:2px}
.artg-mi.is-on .artg-mi__i{background:#2a2a2a;color:#fff}
.artg-mi .artg-snd-on{display:none}
.artg-mi.is-on .artg-snd-on{display:block}
.artg-mi.is-on .artg-snd-off{display:none}
.artg-mi:nth-child(2){animation-delay:.02s}.artg-mi:nth-child(3){animation-delay:.04s}.artg-mi:nth-child(4){animation-delay:.06s}
.artg-mi:nth-child(5){animation-delay:.08s}.artg-mi:nth-child(6){animation-delay:.1s}.artg-mi:nth-child(7){animation-delay:.12s}
.artg-mi:nth-child(8){animation-delay:.14s}.artg-mi:nth-child(9){animation-delay:.16s}
@keyframes artg-mi-in{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.artg-mi{animation:none}}
/* \u043D\u0438\u0437\u043A\u0430\u044F \u0441\u0446\u0435\u043D\u0430 (\u0442\u0435\u043B\u0435\u0444\u043E\u043D \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u043E): \u043F\u0443\u043D\u043A\u0442\u044B \u043C\u0435\u043B\u044C\u0447\u0435; \u043D\u0435 \u0432\u043B\u0435\u0437\u043B\u0438 \u2014 \u043A\u043E\u043B\u043E\u043D\u043A\u0430 \u043F\u0440\u043E\u043A\u0440\u0443\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F */
@media (max-height:520px){.artg-mi__i{width:36px;height:36px}.artg-mi__t{padding:6px 10px;font-size:13px}.artg-menu{gap:6px}}
/* \u043D\u0435 \u0432\u043E \u0432\u0435\u0441\u044C \u044D\u043A\u0440\u0430\u043D \u043D\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0435: \u0432\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u043F\u0430\u043B\u044C\u0446\u0430 \u043B\u0438\u0441\u0442\u0430\u0435\u0442
   \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443, \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u2014 \u043F\u043E\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u0442 \u0432\u0437\u0433\u043B\u044F\u0434; \u0432\u043E \u0432\u0435\u0441\u044C \u044D\u043A\u0440\u0430\u043D \u043F\u0430\u043B\u0435\u0446
   \u0441\u043D\u043E\u0432\u0430 \u0446\u0435\u043B\u0438\u043A\u043E\u043C \u0443 \u0437\u0430\u043B\u0430 */
.artg-stage.is-touch:not(.is-fs){touch-action:pan-y}
.artg-joy,.artg-move,.artg-step{touch-action:none}
/* \u043F\u043E\u043A\u0430 \u043E\u0442\u043A\u0440\u044B\u0442\u0430 \u043F\u0430\u043D\u0435\u043B\u044C \u2014 \u0434\u0436\u043E\u0439\u0441\u0442\u0438\u043A \u0438 \u043A\u043D\u043E\u043F\u043A\u0438 \u0448\u0430\u0433\u0430 \u043D\u0435 \u043B\u0435\u0437\u0443\u0442 \u043F\u043E\u0432\u0435\u0440\u0445 \u043D\u0435\u0451 */
.artg-stage.has-panel .artg-move,.artg-stage.has-panel .artg-joy{visibility:hidden}
/* \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430 \u043D\u0430 \u0441\u0435\u043D\u0441\u043E\u0440\u043D\u043E\u043C \u044D\u043A\u0440\u0430\u043D\u0435 \u2014 \u043D\u0430\u0434 \u0434\u0436\u043E\u0439\u0441\u0442\u0438\u043A\u043E\u043C, \u0430 \u043D\u0435 \u043D\u0430 \u043D\u0451\u043C */
.artg-stage.is-touch .artg-hint{bottom:148px}
/* \u044D\u043A\u0441\u043A\u0443\u0440\u0441\u0438\u044F \u0432\u0435\u0434\u0451\u0442 \u0441\u0430\u043C\u0430 \u2014 \u0434\u0436\u043E\u0439\u0441\u0442\u0438\u043A \u0438 \u0448\u0430\u0433\u0438 \u043D\u0435 \u043D\u0443\u0436\u043D\u044B (\u043B\u044E\u0431\u043E\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u0435 \u0435\u0451 \u0438 \u0442\u0430\u043A
   \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442); \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u044D\u043A\u0441\u043A\u0443\u0440\u0441\u0438\u0438 \u2014 \u0432\u043D\u0438\u0437\u0443 */
.artg-stage.is-touring .artg-move,.artg-stage.is-touring .artg-joy{visibility:hidden}
.artg-stage.is-touch.is-touring .artg-tour{bottom:max(16px,env(safe-area-inset-bottom))}
/* \u0443\u0437\u043A\u0430\u044F \u0441\u0446\u0435\u043D\u0430: \u0442\u0435\u043A\u0441\u0442 \u044D\u043A\u0441\u043A\u0443\u0440\u0441\u0438\u0438 \u2014 \u0441\u0442\u0440\u043E\u043A\u043E\u0439 \u0441\u0432\u0435\u0440\u0445\u0443, \u043A\u043D\u043E\u043F\u043A\u0438 \u2014 \u043F\u043E\u0434 \u043D\u0438\u043C */
.artg-stage.is-narrow .artg-tour{flex-wrap:wrap;padding:12px 12px 12px 14px;gap:10px}
.artg-stage.is-narrow .artg-tour__txt{flex:1 1 100%}
.artg-stage.is-narrow .artg-tour__btns{flex:1 1 100%;justify-content:space-between}
.artg-stage.is-narrow .artg-tour__txt b{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.artg-stage.is-touring [data-a="tour"]{background:#2a2a2a;color:#fff}
.artg-tour{position:absolute;left:50%;bottom:84px;transform:translateX(-50%);width:min(560px,calc(100% - 28px));box-sizing:border-box;
  display:flex;align-items:center;gap:12px;padding:12px 12px 12px 18px;background:rgba(255,255,255,.96);border-radius:14px;
  box-shadow:0 10px 40px rgba(0,0,0,.14)}
.artg-tour[hidden]{display:none}
.artg-tour__txt{flex:1;min-width:0;line-height:1.3}
.artg-tour__txt b{display:block;font-weight:500;font-size:15px;color:#2a2a2a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.artg-tour__txt span{font-size:12px;color:#8c8c88}
.artg-tour__btns{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.artg-tour__btns button{border:0;background:#f0efec;color:#2a2a2a;min-width:38px;height:38px;border-radius:999px;font-size:18px;cursor:pointer;padding:0 12px}
.artg-tour__btns button:hover{background:#e4e3df}
.artg-tour__btns .artg-tour__stop,.artg-tour__btns .artg-tour__wide{font-size:14px}
.artg-tour__btns .artg-tour__stop{background:#2a2a2a;color:#fff}
.artg-joy{display:none;position:absolute;left:18px;bottom:18px;width:112px;height:112px;border-radius:50%;
  background:rgba(255,255,255,.55);box-shadow:inset 0 0 0 1px rgba(0,0,0,.08),0 4px 14px rgba(0,0,0,.08);touch-action:none}
.artg-joy i{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:#fff;
  box-shadow:0 2px 10px rgba(0,0,0,.18);transition:transform .12s}
.artg-joy.is-on i{transition:none;background:#2a2a2a}
.artg-stage.is-touch .artg-joy{display:block}
.artg-stage.is-touch .artg-move{left:auto;right:18px;transform:none}
.artg-panel{position:absolute;right:14px;top:60px;width:min(340px,calc(100% - 28px));max-height:calc(100% - 140px);
  display:flex;flex-direction:column;background:rgba(255,255,255,.97);border-radius:14px;
  box-shadow:0 10px 40px rgba(0,0,0,.14);overflow:hidden}
.artg-panel[hidden]{display:none}
.artg-panel__q{margin:8px 12px 12px;padding:10px 12px;border:1px solid #dcdbd7;border-radius:10px;font-size:16px;background:#fafaf9}
.artg-stage button{touch-action:manipulation}
.artg-panel__list{overflow:auto;padding:0 6px 10px}
.artg-panel__list button{display:block;width:100%;text-align:left;border:0;background:none;padding:8px 10px;
  border-radius:8px;font-size:14px;color:#2a2a2a;cursor:pointer}
.artg-panel__list button:hover,.artg-panel__list button:focus-visible{background:#f0efec;outline:none}
.artg-panel__list i{display:block;font-style:normal;font-size:12px;color:#8c8c88}
.artg-panel__sec{margin:10px 10px 4px;font:12px/1 "Helvetica Neue",Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:#8c8c88}
.artg-panel__none{padding:10px;color:#8c8c88}
.artg-map{position:absolute;right:14px;top:60px;width:min(360px,calc(100% - 28px));max-height:calc(100% - 140px);
  display:flex;flex-direction:column;background:rgba(255,255,255,.97);border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,.14);overflow:hidden}
.artg-map[hidden]{display:none}
.artg-map__plan{width:100%;height:auto;aspect-ratio:2/1;display:block;cursor:pointer;border-bottom:1px solid #ecebe8}
.artg-map__list{overflow:auto;padding:4px 6px 10px}
.artg-map__list button{display:block;width:100%;text-align:left;border:0;background:none;padding:7px 10px;border-radius:8px;
  font-size:14px;color:#2a2a2a;cursor:pointer}
.artg-map__list button:hover,.artg-map__list button:focus-visible{background:#f0efec;outline:none}
.artg-map__list button.is-here{background:#2a2a2a;color:#fff}
.artg-map__list button.is-here i{color:#cfcfcb}
.artg-map__list i{display:block;font-style:normal;font-size:12px;color:#8c8c88;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.artg-qpanel{position:absolute;right:14px;top:60px;width:230px;padding:10px;background:rgba(255,255,255,.97);border-radius:14px;
  box-shadow:0 10px 40px rgba(0,0,0,.14);display:flex;flex-direction:column;gap:2px}
.artg-qpanel[hidden]{display:none}
.artg-phead{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 10px 2px 16px;flex-shrink:0}
.artg-qpanel .artg-phead{padding:2px 0 4px 8px}
.artg-phead b{font:500 12px/1.2 "Inter","Helvetica Neue",Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:#8c8c88}
.artg-close{appearance:none;border:0;width:36px;height:36px;flex-shrink:0;border-radius:50%;background:#f0efec;color:#2a2a2a;
  display:flex;align-items:center;justify-content:center;cursor:pointer}
.artg-close:hover{background:#e4e3df}
.artg-close:focus-visible{outline:2px solid #2a2a2a;outline-offset:2px}
.artg-qpanel button{border:0;background:none;text-align:left;padding:8px 10px;border-radius:8px;font-size:14px;color:#2a2a2a;cursor:pointer}
.artg-qpanel button:hover,.artg-qpanel button:focus-visible{background:#f0efec;outline:none}
.artg-qpanel button.is-on{background:#2a2a2a;color:#fff}
.artg-qpanel small{margin:6px 8px 2px;font-size:12px;line-height:1.35;color:#8c8c88}
.artg-hint{position:absolute;left:50%;bottom:86px;transform:translate(-50%,10px);max-width:min(560px,86%);
  padding:10px 16px;border-radius:12px;background:rgba(42,42,42,.82);color:#fff;font-size:14px;line-height:1.35;
  text-align:center;opacity:0;transition:opacity .35s,transform .35s;pointer-events:none}
.artg-hint.is-on{opacity:1;transform:translate(-50%,0)}
.artg-move{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);display:flex;gap:10px}
.artg-step{appearance:none;border:0;width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.9);
  color:#2a2a2a;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.1);
  touch-action:none}
.artg-step:active{background:#2a2a2a;color:#fff}
.artg-load{position:absolute;left:0;right:0;top:0;height:3px;background:rgba(0,0,0,.06);transition:opacity .5s}
.artg-load i{display:block;height:100%;width:0;background:#2a2a2a;transition:width .3s}
.artg-load.is-done{opacity:0}
.artg-slow{position:absolute;left:50%;bottom:86px;transform:translateX(-50%);z-index:6;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 10px;max-width:calc(100% - 24px);padding:12px 14px;border-radius:16px;background:rgba(42,42,42,.92);color:#fff;font:14px/1.35 "Inter","Helvetica Neue",Arial,sans-serif;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.2)}
.artg-slow[hidden]{display:none}
.artg-slow .artg-btn{background:#fff;color:#2a2a2a}
.artg-slow .artg-slow__no{background:transparent;color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.5)}
.artg-enter{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(236,235,232,.28);touch-action:pan-y}
.artg-enter[hidden]{display:none}
.artg-enter__btn{height:56px;padding:0 26px 0 22px;font-size:17px;font-weight:600;gap:10px;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.18),0 1px 0 rgba(0,0,0,.06)}
.artg-stage.has-enter .artg-move,.artg-stage.has-enter .artg-joy{display:none}
.artg-fade{position:absolute;inset:0;background:#ecebe8;opacity:0;pointer-events:none;transition:opacity .3s}
.artg-fade.is-on{opacity:1}
.artg-stage.is-fs{max-width:none;height:100%;border-radius:0}
.artg-fs-host{position:fixed;inset:0;z-index:2147483000;background:#ecebe8;padding:0!important}
.artg-fs-host .artg-stage{height:100%;width:100%;max-width:none;border-radius:0}
/* \u0432\u043E \u0432\u0435\u0441\u044C \u044D\u043A\u0440\u0430\u043D \u043D\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0435 \u2014 \u043D\u0435 \u043F\u043E\u0434 \xAB\u0447\u0451\u043B\u043A\u043E\u0439\xBB \u0438 \u043D\u0435 \u043F\u043E\u0434 \u043F\u043E\u043B\u043E\u0441\u043A\u043E\u0439 \xAB\u0434\u043E\u043C\u043E\u0439\xBB */
.artg-stage.is-fs .artg-top{top:max(12px,env(safe-area-inset-top));left:max(14px,env(safe-area-inset-left));right:max(14px,env(safe-area-inset-right))}
.artg-stage.is-fs .artg-move{bottom:max(16px,env(safe-area-inset-bottom))}
.artg-stage.is-fs .artg-joy{bottom:max(18px,env(safe-area-inset-bottom));left:max(18px,env(safe-area-inset-left))}
.artg-stage.is-fs.is-touch .artg-move{right:max(18px,env(safe-area-inset-right))}
@media (max-width:600px){
  .artg-stage{height:clamp(440px,74vh,640px);border-radius:16px}
  .artg-tour{bottom:140px}
  .artg-tour__txt b{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
}
/* \u043E\u0431\u043B\u0430\u0447\u043A\u043E \u043D\u0430\u0434 \u0433\u043E\u043B\u043E\u0432\u043E\u0439 \u043A\u0443\u0440\u0430\u0442\u043E\u0440\u0430 \u0432 \u0445\u043E\u043B\u043B\u0435; \u0441\u0442\u0430\u0432\u0438\u0442\u0441\u044F \u043F\u043E \u044D\u043A\u0440\u0430\u043D\u043D\u044B\u043C \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0430\u043C \u0433\u043E\u043B\u043E\u0432\u044B */
.artg-say{position:absolute;left:0;top:0;max-width:270px;padding:10px 14px;border:0;margin:0;border-radius:16px;background:#fff;color:#2a2a2a;
  font:400 15px/1.3 "Inter","Helvetica Neue",Arial,sans-serif;text-align:left;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.16);
  opacity:0;visibility:hidden;pointer-events:none;transition:opacity .35s ease,visibility .35s,background-color .2s,color .2s;will-change:transform}
.artg-say.is-on{opacity:1;visibility:visible;pointer-events:auto}
.artg-say::after{content:"";position:absolute;left:14px;top:100%;border:9px solid transparent;border-top-color:#fff;border-bottom:0;border-left-width:3px;transition:border-color .2s}
.artg-say:hover{background:#2a2a2a;color:#fff}
.artg-say:hover::after{border-top-color:#2a2a2a}
.artg-stage.is-narrow .artg-say{font-size:13px;max-width:210px;padding:8px 12px}
`;var zp=_t/2,Hp="artg-light",Jy="1";function Vp(){return window.matchMedia&&matchMedia("(pointer: coarse)").matches}function Qy(){return Vp()||Math.min(screen.width,screen.height)<700}function ga(r){return String(r==null?"":r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function $y(){if(document.getElementById("artg-css"))return;let r=document.createElement("style");r.id="artg-css",r.textContent=Bp,document.head.appendChild(r)}var Yu=class{constructor(e,t){$y(),this.host=e,this.bridge=t,this.small=Qy(),this.touch=Vp(),e.innerHTML='<div class="artg-stage" tabindex="0" role="application" aria-label="\u0412\u0438\u0440\u0442\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0433\u0430\u043B\u0435\u0440\u0435\u044F: \u0445\u043E\u0434\u044C\u0431\u0430 \u0441\u0442\u0440\u0435\u043B\u043A\u0430\u043C\u0438 \u0438\u043B\u0438 W/S, \u043F\u043E\u043B\u043E\u0442\u043D\u0430 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u043D\u0430\u0436\u0430\u0442\u0438\u0435\u043C"><canvas class="artg-canvas"></canvas><div class="artg-enter" hidden><button type="button" class="artg-btn artg-enter__btn" data-a="enter"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg><span>\u0412\u043E\u0439\u0442\u0438 \u0432 3D-\u0437\u0430\u043B</span></button></div><div class="artg-top"><div class="artg-where"><b></b><span></span></div><div class="artg-actions"><button type="button" class="artg-btn artg-tbtn artg-fs-btn" data-a="fs"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg><span class="artg-t artg-t--in">\u041F\u043E\u043B\u043D\u044B\u0439 \u044D\u043A\u0440\u0430\u043D</span><span class="artg-t artg-t--out">\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C</span></button><button type="button" class="artg-btn artg-tbtn artg-menu-btn" data-a="menu" aria-expanded="false"><svg class="artg-ico-menu" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg class="artg-ico-close" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg><span class="artg-t artg-t--in">\u041C\u0435\u043D\u044E</span><span class="artg-t artg-t--out">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</span></button></div></div><div class="artg-menu" hidden role="menu" aria-label="\u041C\u0435\u043D\u044E \u0433\u0430\u043B\u0435\u0440\u0435\u0438"><button type="button" class="artg-mi" data-a="tour" role="menuitem"><span class="artg-mi__t">\u042D\u043A\u0441\u043A\u0443\u0440\u0441\u0438\u044F \u043F\u043E \u0437\u0430\u043B\u0443</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5v14l11-7z"/></svg></i></button><button type="button" class="artg-mi" data-a="hall" role="menuitem"><span class="artg-mi__t">\u0412 \u0445\u043E\u043B\u043B</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7M5 10v10h14V10"/></svg></i></button><button type="button" class="artg-mi" data-a="map" role="menuitem"><span class="artg-mi__t">\u041F\u043B\u0430\u043D \u0437\u0430\u043B\u043E\u0432</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/></svg></i></button><button type="button" class="artg-mi" data-a="list" role="menuitem"><span class="artg-mi__t">\u0425\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0438</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></i></button>'+(t.curator?'<button type="button" class="artg-mi" data-a="cur" role="menuitem"><span class="artg-mi__t">\u0421\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043A\u0443\u0440\u0430\u0442\u043E\u0440\u0430</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.4A8 8 0 1 1 21 12z"/><path d="M9 10.5h6M9 13.5h4"/></svg></i></button>':"")+'<button type="button" class="artg-mi" data-a="snd" role="menuitemcheckbox" aria-checked="false"><span class="artg-mi__t">\u0417\u0432\u0443\u043A</span><i class="artg-mi__i"><svg class="artg-snd-on" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg><svg class="artg-snd-off" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4V5zM16 9l6 6M22 9l-6 6"/></svg></i></button><button type="button" class="artg-mi" data-a="light" role="menuitemcheckbox" aria-checked="false"><span class="artg-mi__t">\u0421\u0432\u0435\u0442</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg></i></button><button type="button" class="artg-mi" data-a="share" role="menuitem"><span class="artg-mi__t">\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u044D\u0442\u043E \u043C\u0435\u0441\u0442\u043E</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg></i></button><button type="button" class="artg-mi" data-a="q" role="menuitem"><span class="artg-mi__t">\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg></i></button><button type="button" class="artg-mi" data-a="simple" role="menuitem"><span class="artg-mi__t">\u041F\u0440\u043E\u0441\u0442\u043E\u0439 \u0440\u0435\u0436\u0438\u043C</span><i class="artg-mi__i"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg></i></button></div><div class="artg-panel" hidden><div class="artg-phead"><b>\u0425\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0438</b><button type="button" class="artg-close" data-close aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><input type="search" class="artg-panel__q" placeholder="\u0424\u0430\u043C\u0438\u043B\u0438\u044F \u0438\u043B\u0438 \u0433\u043E\u0440\u043E\u0434" aria-label="\u041F\u043E\u0438\u0441\u043A \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0430"><div class="artg-panel__list"></div></div><div class="artg-map" hidden><div class="artg-phead"><b>\u041F\u043B\u0430\u043D</b><button type="button" class="artg-close" data-close aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><canvas class="artg-map__plan" width="600" height="300"></canvas><div class="artg-map__list"></div></div><div class="artg-qpanel" hidden role="radiogroup" aria-label="\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"><div class="artg-phead"><b>\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F</b><button type="button" class="artg-close" data-close aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>'+[["auto","\u0410\u0432\u0442\u043E"],["hd","HD \xB7 \u043E\u0431\u044A\u0451\u043C \u0438 \u0441\u0432\u0435\u0447\u0435\u043D\u0438\u0435"],["sd","SD \xB7 \u043F\u043B\u0430\u0432\u043D\u0435\u0435, \u0434\u043B\u044F \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"],["eco","\u042D\u043A\u043E\u043D\u043E\u043C \xB7 \u0434\u043B\u044F \u0441\u043B\u0430\u0431\u044B\u0445 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043E\u0432"]].map(([T,I])=>'<button type="button" role="radio" data-q="'+T+'">'+I+"</button>").join("")+'<small></small></div><div class="artg-hint"></div><div class="artg-slow" hidden role="alert"><span>3D-\u0437\u0430\u043B \u0438\u0434\u0451\u0442 \u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435.</span><button type="button" class="artg-btn" data-a="slow-yes">\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043F\u0440\u043E\u0441\u0442\u043E\u0439 \u0437\u0430\u043B</button><button type="button" class="artg-btn artg-slow__no" data-a="slow-no">\u041E\u0441\u0442\u0430\u0442\u044C\u0441\u044F</button></div>'+(t.curator?'<button type="button" class="artg-say" tabindex="-1" aria-hidden="true">\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u0432\u0438\u0440\u0442\u0443\u0430\u043B\u044C\u043D\u0443\u044E \u0432\u044B\u0441\u0442\u0430\u0432\u043A\u0443! \u041C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 \u0422\u0430\u0442\u044C\u044F\u043D\u0430. \u041C\u043E\u0433\u0443 \u0412\u0430\u043C \u043F\u043E\u043C\u043E\u0447\u044C?</button>':"")+'<div class="artg-tour" hidden aria-live="polite"></div><div class="artg-joy" aria-hidden="true"><i></i></div><div class="artg-move"><button type="button" class="artg-step" data-step="1" aria-label="\u0428\u0430\u0433 \u0432\u043F\u0435\u0440\u0451\u0434"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 5l7 9H5z" fill="currentColor"/></svg></button><button type="button" class="artg-step" data-step="-1" aria-label="\u0428\u0430\u0433 \u043D\u0430\u0437\u0430\u0434"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 19l7-9H5z" fill="currentColor"/></svg></button></div><div class="artg-load"><i></i></div><div class="artg-fade is-on"></div></div>',this.stage=e.querySelector(".artg-stage"),this.canvas=e.querySelector(".artg-canvas");let n;try{n=new uo({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"})}catch{this.dead=!0,t.fallback&&t.fallback("webgl");return}this.renderer=n,n.outputColorSpace=je,n.toneMapping=ia,n.toneMappingExposure=1,this.maxPR=Math.min(window.devicePixelRatio||1,(this.small,2)),this.pr=this.maxPR,n.setPixelRatio(this.pr);let i=navigator.userAgent,s=/[?&#]artlean\b/.test(location.search+location.hash);this.lean=s||this.small&&(/Android/i.test(i)||navigator.deviceMemory&&navigator.deviceMemory<=4),Hi.max=this.lean?512:0;let a=n.getContext(),o="";try{let T=a.getExtension("WEBGL_debug_renderer_info");o=String(a.getParameter(T?T.UNMASKED_RENDERER_WEBGL:a.RENDERER)||"")}catch{}this.gpu=o;let l=location.search+location.hash,c=!!t.force3d||/[?&#]artforce\b/.test(l);try{c=c||!!sessionStorage.getItem("artg-force3d")}catch{}if(this.soft=/swiftshader|llvmpipe|softpipe|software|basic render|mesa offscreen/i.test(o),this.soft&&!c){this.dead=!0,n.dispose(),t.fallback&&t.fallback("slow");return}this.weak=this.soft||/[?&#]artweak\b/.test(l)||!this.small&&(/intel.*\b(hd|uhd)\b|intel\(r\) graphics(?! xe)|\bgma\b|radeon.*\b(r[2-7]|hd ?[4-7]\d{3})\b/i.test(o)||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2||navigator.deviceMemory&&navigator.deviceMemory<=4),this.light=this.small||this.weak,Hi.lo=this.weak,this.floatRT=!!(a.getExtension("EXT_color_buffer_float")||a.getExtension("EXT_color_buffer_half_float")),this.diag={shaderErrors:[],glErrors:0,lost:0,hitches:[]},this.prof={on:!1},n.debug.onShaderError=(T,I,S,y)=>{let R=(T.getProgramInfoLog(I)||"")+" "+(T.getShaderInfoLog(y)||"")+" "+(T.getShaderInfoLog(S)||"");this.diag.shaderErrors.push(R.trim().slice(0,300)),console.warn("[artgallery] \u0448\u0435\u0439\u0434\u0435\u0440 \u043D\u0435 \u0441\u043E\u0431\u0440\u0430\u043B\u0441\u044F:",R)},this.tex=new ol(n,t,this.light,this.lean),this.tex.prefetchAtlas(),this.plan=sp(t.artists,t.sections);let h=performance.now();this.world=new rl(n,this.plan,t);let u=this.weak?null:this.world.needLTC();this.props=new Al(this.world),this.world.props=this.props,this.marks=new wl(this.world.scene),this.world.build(),this.curator=t.curator?new Cl(this.world,t):null,this.buildMs=Math.round(performance.now()-h),this.scene=this.world.scene,this.peers=t.live?new Sl(this.scene,this.light,T=>t.url(T),this.world.pickables):null,this.peers&&this.world.pickables.push(...this.peers.meshes),n.shadowMap.enabled=!this.light,n.shadowMap.autoUpdate=!1,n.shadowMap.type=Ih,this.spots=new xl(this.scene,this.light),this.atmo=new El(this.scene,this.spots,this.light),this.sound=new Tl(T=>t.url(T)),this.sound.onTrack=T=>this.hint("\u266A "+T.t+" \xB7 \u0438\u0441\u043F. "+T.p),this.onVis=()=>{this.sound.visible(!document.hidden),document.hidden&&this.curator&&this.curator.play(!1)},document.addEventListener("visibilitychange",this.onVis),this.lastPos={x:0,z:0},this.bobAmp=0,this.bobPhase=0;let d="";try{d=localStorage.getItem(Hp)||""}catch{}this.naturalLight=d==="natural",this.probe=new bl(n,this.scene,this.light),this.probe.off=!this.floatRT||this.weak,this.world.reflectMats().forEach(T=>this.probe.patch(T)),this.probeKey="",this.camera=new Nt(62,1,.05,140),this.camera.rotation.order="YXZ",this.nav=new al(this.plan);let f=this.props;f.reflectMats().forEach(T=>this.probe.patch(T)),this.world.plantMat&&f.swayPlants(this.world.plantMat),f.screen(t,this.tex),f.sculpture(),this.spots.factor=T=>f.spotFactor(T),f.onDoor=(T,I)=>this.sound.door(T,I),f.onWake=()=>this.sound.lightsOn(),this.quality=new pl(this),this.quality.onChange=()=>this.fillQuality(),this.world.onPaintings=T=>this.tex.attach(T),this.allWorks=[].concat(...this.plan.corridors.map(T=>T.works)),this.cull=!0,this.ray=new Vo,this.ray.far=45,this.focus=null,this.room=-1,this.bay=null,this.visible=!0,this.frames=[],this.tick=0;let m=this.stage.querySelector(".artg-load"),b=()=>{if(!(this.dead||this.revealed||this.warming)){if(!this.warmed){this.warming=!0,this.warm().then(()=>{this.warming=!1,b()});return}this.revealed=!0,this.tex.resetStats(),this.applyHash(),this.stage.querySelector(".artg-fade").classList.remove("is-on"),this.enterShow(),t.onReady&&t.onReady()}},g=this.world.pbr,p=Object.keys(g.cache).length,_=0,v=1,x=!1,E=!u;u&&u.then(()=>{E=!0,w()},()=>{E=!0,w()});let w=()=>{if(this.dead)return;let T=p-g.pending,I=(_+T)/(v+p);m.firstChild.style.width=I*100+"%",t.onProgress&&t.onProgress(I*.92),x&&g.pending<=0&&E&&(clearTimeout(this.revealT),clearTimeout(this.showT),this.showT=setTimeout(b,120),setTimeout(()=>m.classList.add("is-done"),300))};g.onLoad=w,this.revealT=setTimeout(()=>{b(),m.classList.add("is-done")},15e3),this.tex.loadAtlas(this.world.paintings,(T,I)=>{_=T,v=I||1,T>=I&&(x=!0),w()}),this.touch&&this.stage.classList.add("is-touch"),/[?&#]artdebug\b/.test(location.search+location.hash)&&this.debugPanel(),this.bindUi(),this.tour=new gl(this),this.bindInput(),this.resize(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(this.stage),this.io=new IntersectionObserver(T=>{this.visible=T[T.length-1].isIntersecting}),this.io.observe(this.stage),this.fsHandler=()=>this.onFsChange(),document.addEventListener("fullscreenchange",this.fsHandler),document.addEventListener("webkitfullscreenchange",this.fsHandler),this.canvas.addEventListener("webglcontextlost",T=>{this.dead||(this.diag.lost++,T.preventDefault(),this.dead=!0,t.fallback&&t.fallback("context"))}),this.last=performance.now(),this.loop=this.loop.bind(this),this.raf=requestAnimationFrame(this.loop),this.updateWhere(),this.hint(this.touch?"\u041A\u0440\u0443\u0433 \u0441\u043B\u0435\u0432\u0430 \u0432\u043D\u0438\u0437\u0443 \u2014 \u0438\u0434\u0442\u0438, \u043F\u0430\u043B\u0435\u0446 \u043F\u043E \u0441\u0446\u0435\u043D\u0435 \u2014 \u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C\u0441\u044F. \u041A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u043A\u0430\u0440\u0442\u0438\u043D\u044B \u2014 \u043F\u043E\u0434\u043E\u0439\u0434\u0451\u0442\u0435 \u043A \u043D\u0435\u0439":"\u041F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0439\u0442\u0435 \u043C\u044B\u0448\u044C\u044E, \u0447\u0442\u043E\u0431\u044B \u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C\u0441\u044F. W/S \u0438\u043B\u0438 \u0441\u0442\u0440\u0435\u043B\u043A\u0438 \u2014 \u0438\u0434\u0442\u0438, \u0449\u0435\u043B\u0447\u043E\u043A \u043F\u043E \u043F\u043E\u043B\u0443 \u0438\u043B\u0438 \u043A\u0430\u0440\u0442\u0438\u043D\u0435 \u2014 \u043F\u043E\u0434\u043E\u0439\u0442\u0438")}bindUi(){let e=this.stage;e.querySelector('[data-a="hall"]').addEventListener("click",()=>this.goHall()),e.querySelector(".artg-where span").addEventListener("click",()=>{this.bay&&this.bridge.openArtist(this.bay.gi)}),e.querySelector('[data-a="simple"]').addEventListener("click",()=>{this.bridge.simple&&this.bridge.simple()}),e.querySelector('[data-a="list"]').addEventListener("click",()=>{this.toggleMap(!1),this.togglePanel()}),e.querySelector('[data-a="map"]').addEventListener("click",()=>{this.togglePanel(!1),this.toggleMap()}),e.querySelector('[data-a="share"]').addEventListener("click",()=>this.share());let t=e.querySelector('[data-a="cur"]');t&&t.addEventListener("click",()=>this.askCurator()),this.say=e.querySelector(".artg-say"),this.say&&this.say.addEventListener("click",()=>this.askCurator()),e.querySelector(".artg-map__list").addEventListener("click",d=>{let f=d.target.closest("[data-room]");if(!f)return;let[m,b]=f.getAttribute("data-room").split(".").map(Number);this.toggleMap(!1),m<0?this.goHall():this.goToSubRoom(m,b)}),e.querySelector(".artg-map__plan").addEventListener("click",d=>this.mapClick(d)),e.querySelector('[data-a="fs"]').addEventListener("click",()=>this.toggleFullscreen()),e.querySelector('[data-a="slow-yes"]').addEventListener("click",d=>{d.stopPropagation(),this.stage.classList.contains("is-fs")&&this.toggleFullscreen(),this.bridge.simple()}),e.querySelector('[data-a="slow-no"]').addEventListener("click",d=>{d.stopPropagation(),this.stage.querySelector(".artg-slow").hidden=!0});let n=e.querySelector(".artg-enter");["pointerdown","touchstart"].forEach(d=>n.addEventListener(d,f=>f.stopPropagation(),{passive:!0})),e.querySelector('[data-a="enter"]').addEventListener("click",d=>{d.stopPropagation(),this.entered=!0,this.enterShow(!1),this.stage.classList.contains("is-fs")||this.toggleFullscreen()});let i=e.querySelector('[data-a="snd"]'),s=()=>{i.setAttribute("aria-checked",String(this.sound.on)),i.classList.toggle("is-on",this.sound.on),i.firstChild.textContent=this.sound.on?"\u041C\u0443\u0437\u044B\u043A\u0430 \u0438 \u0437\u0432\u0443\u043A \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u044B":"\u041C\u0443\u0437\u044B\u043A\u0430 \u0438 \u0437\u0432\u0443\u043A \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u044B"};i.addEventListener("click",()=>{this.sound.toggle(),s()});let a=e.querySelector('[data-a="light"]'),o=()=>{a.setAttribute("aria-checked",String(this.naturalLight)),a.classList.toggle("is-on",this.naturalLight),a.firstChild.textContent=this.naturalLight?"\u0421\u0432\u0435\u0442: \u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439":"\u0421\u0432\u0435\u0442: \u0441\u043F\u043E\u0442\u044B"};a.addEventListener("click",()=>{this.setNaturalLight(!this.naturalLight),o(),e.querySelector(".artg-menu").hidden&&this.hint(this.naturalLight?"\u0415\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0441\u0432\u0435\u0442: \u0441\u043F\u043E\u0442\u044B \u043F\u043E\u0433\u0430\u0448\u0435\u043D\u044B, \u043A\u0430\u0440\u0442\u0438\u043D\u044B \u2014 \u0432 \u0446\u0432\u0435\u0442\u0430\u0445 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0445 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439":"\u0412\u044B\u0441\u0442\u0430\u0432\u043E\u0447\u043D\u044B\u0439 \u0441\u0432\u0435\u0442: \u0441\u043F\u043E\u0442\u044B \u043D\u0430\u0434 \u0440\u0430\u0431\u043E\u0442\u0430\u043C\u0438")}),o();let l=()=>{this.sound.want&&!this.sound.on&&(this.sound.set(!0),s())};e.addEventListener("pointerdown",l,{once:!0}),e.addEventListener("keydown",l,{once:!0}),s(),e.querySelector('[data-a="tour"]').addEventListener("click",()=>{if(this.tour.running){this.tour.stop();return}this.closePanels();let d=this.room>=0?this.room:this.bridge.section?this.bridge.section():0;this.tour.start(d)}),this.bindJoystick(),e.querySelector('[data-a="q"]').addEventListener("click",()=>{let d=e.querySelector(".artg-qpanel"),f=d.hidden;this.closePanels(),d.hidden=!f,e.querySelector('[data-a="q"]').setAttribute("aria-expanded",String(f)),f&&(this.placePanels(),this.fillQuality()),e.classList.toggle("has-panel",this.anyPanel())});let c=e.querySelector(".artg-menu"),h=e.querySelector('[data-a="menu"]');h.addEventListener("click",()=>{let d=c.hidden;this.closePanels(),d&&(c.hidden=!1,h.setAttribute("aria-expanded","true"),e.classList.add("is-menu"),this.placePanels())}),c.addEventListener("click",d=>{let f=d.target.closest("[data-a]");if(!f){this.closeMenu();return}let m=f.getAttribute("data-a");m!=="snd"&&m!=="light"&&!c.hidden&&this.closeMenu()},!0),e.querySelectorAll("[data-close]").forEach(d=>d.addEventListener("click",()=>this.closePanels())),e.querySelector(".artg-qpanel").addEventListener("click",d=>{let f=d.target.closest("[data-q]");f&&this.quality.choose(f.getAttribute("data-q"))});let u=e.querySelector(".artg-panel__q");u.addEventListener("input",()=>this.fillPanel(u.value)),u.addEventListener("keydown",d=>{d.key==="Escape"&&this.togglePanel(!1),d.stopPropagation()}),e.querySelector(".artg-panel__list").addEventListener("click",d=>{let f=d.target.closest("[data-gi]");f&&(this.togglePanel(!1),this.goToArtist(+f.getAttribute("data-gi")))}),e.querySelectorAll(".artg-step").forEach(d=>{let f=+d.getAttribute("data-step"),m=g=>{g.preventDefault(),g.stopPropagation(),this.tour.running&&this.tour.stop(),this.nav.hold=f,d.setPointerCapture&&d.setPointerCapture(g.pointerId)},b=()=>{this.nav.hold===f&&(this.nav.hold=0)};d.addEventListener("pointerdown",m),["pointerup","pointercancel","lostpointercapture"].forEach(g=>d.addEventListener(g,b))})}bindJoystick(){let e=this.stage.querySelector(".artg-joy"),t=e.firstChild,n=null,i=0,s=0,a=44,o=(c,h)=>{let u=Math.hypot(c,h),d=u>a?a/u:1;c*=d,h*=d,t.style.transform="translate("+c+"px,"+h+"px)",this.nav.joy.x=c/a,this.nav.joy.y=h/a};e.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),this.tour.running&&this.tour.stop(),n=c.pointerId;let h=e.getBoundingClientRect();i=h.left+h.width/2,s=h.top+h.height/2;try{e.setPointerCapture(n)}catch{}e.classList.add("is-on"),o(c.clientX-i,c.clientY-s)}),e.addEventListener("pointermove",c=>{c.pointerId===n&&o(c.clientX-i,c.clientY-s)});let l=c=>{c.pointerId===n&&(n=null,e.classList.remove("is-on"),o(0,0))};["pointerup","pointercancel","lostpointercapture"].forEach(c=>e.addEventListener(c,l))}fillQuality(){let e=this.stage&&this.stage.querySelector(".artg-qpanel");if(!e||!this.quality)return;let t=this.quality;e.querySelectorAll("[data-q]").forEach(n=>{let i=n.getAttribute("data-q")===t.mode;n.classList.toggle("is-on",i),n.setAttribute("aria-checked",String(i))}),e.querySelector("small").textContent=t.mode==="auto"?"\u0421\u0435\u0439\u0447\u0430\u0441: "+du[t.level]+". \u0427\u0451\u0442\u043A\u043E\u0441\u0442\u044C \u043F\u043E\u0434\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0441\u0430\u043C\u0430 \u043F\u043E\u0434 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430":"\u0412\u044B\u0431\u0440\u0430\u043D\u043E \u0432\u0440\u0443\u0447\u043D\u0443\u044E"}closeMenu(){let e=this.stage;e.querySelector(".artg-menu").hidden=!0,e.querySelector('[data-a="menu"]').setAttribute("aria-expanded","false"),e.classList.remove("is-menu"),e.classList.toggle("has-panel",this.anyPanel())}closePanels(){let e=this.stage;this.closeMenu(),e.querySelector(".artg-panel").hidden=!0,e.querySelector(".artg-map").hidden=!0,e.querySelector(".artg-qpanel").hidden=!0,e.querySelector('[data-a="q"]').setAttribute("aria-expanded","false"),e.classList.remove("has-panel")}hideHint(){let e=this.stage.querySelector(".artg-hint");e&&e.classList.remove("is-on")}anyPanel(){return[".artg-panel",".artg-map",".artg-qpanel",".artg-menu"].some(e=>!this.stage.querySelector(e).hidden)}placePanels(){let e=this.stage.querySelector(".artg-top"),t=e.offsetTop+e.offsetHeight+8;[".artg-panel",".artg-map",".artg-qpanel",".artg-menu"].forEach(n=>{let i=this.stage.querySelector(n);i.style.top=t+"px",i.style.maxHeight="calc(100% - "+(t+16)+"px)"}),this.stage.classList.toggle("has-panel",this.anyPanel()),this.anyPanel()&&this.hideHint()}togglePanel(e){let t=this.stage.querySelector(".artg-panel"),n=e==null?t.hidden:e;if(n&&this.closePanels(),t.hidden=!n,this.stage.classList.toggle("has-panel",this.anyPanel()),n){this.placePanels();let i=t.querySelector(".artg-panel__q");i.value="",this.fillPanel(""),this.touch||i.focus()}}fillPanel(e){let t=e.trim().toLowerCase(),{artists:n,sections:i}=this.bridge,s=i.map(a=>{let o=a.list.filter(l=>{let c=n[l];return c.works&&c.works.length&&(!t||c.name.toLowerCase().includes(t)||(c.city||"").toLowerCase().includes(t))});return o.length?(i.length>1?'<p class="artg-panel__sec">'+ga(a.title)+"</p>":"")+o.map(l=>'<button type="button" data-gi="'+l+'">'+ga(n[l].name)+(n[l].city?"<i>"+ga(n[l].city)+"</i>":"")+"</button>").join(""):""}).join("");this.stage.querySelector(".artg-panel__list").innerHTML=s||'<p class="artg-panel__none">\u041D\u0438\u043A\u043E\u0433\u043E \u043D\u0435 \u043D\u0430\u0448\u043B\u043E\u0441\u044C</p>'}debugPanel(){let e=document.createElement("div");e.className="artg-debug",e.style.cssText="position:absolute;left:8px;bottom:8px;z-index:9;max-width:calc(100% - 16px);box-sizing:border-box;background:rgba(0,0,0,.8);color:#fff;font:11px/1.4 ui-monospace,Menlo,monospace;padding:8px 10px;border-radius:8px;white-space:pre-wrap;word-break:break-word;pointer-events:auto;-webkit-user-select:text;user-select:text",this.stage.appendChild(e);let t=this.renderer,n=t.getContext(),i=n.getExtension("WEBGL_debug_renderer_info"),s=i?n.getParameter(i.UNMASKED_RENDERER_WEBGL):n.getParameter(n.RENDERER),a=n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT),o=0,l=performance.now(),c=()=>{o++,this.dead||requestAnimationFrame(c)};requestAnimationFrame(c);let h=()=>{if(this.dead)return;let u;for(;(u=n.getError())!==n.NO_ERROR;)this.diag.glErrors++,this.diag.lastGl="0x"+u.toString(16);let d=performance.now(),f=o*1e3/(d-l);o=0,l=d;let m=this.tex.report(),b=t.info.memory;e.textContent=["GPU: "+s,"\u041E\u0417\u0423: "+(navigator.deviceMemory||"?")+" \u0413\u0411 \xB7 \u044D\u043A\u0440\u0430\u043D "+screen.width+"\xD7"+screen.height+" \xD7"+(window.devicePixelRatio||1)+" \xB7 \u0440\u0435\u043D\u0434\u0435\u0440 \xD7"+this.pr.toFixed(2),"\u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E: "+this.quality.level+(this.quality.mode==="auto"?" (\u0430\u0432\u0442\u043E)":"")+" \xB7 \u0431\u0435\u0440\u0435\u0436\u043D\u044B\u0439: "+(this.lean?"\u0434\u0430":"\u043D\u0435\u0442")+" \xB7 \u043E\u0442\u0440\u0430\u0436\u0435\u043D\u0438\u044F: "+(this.floatRT?"\u0434\u0430":"\u043D\u0435\u0442")+" \xB7 highp: "+(a&&a.precision>0?"\u0434\u0430":"\u043D\u0435\u0442"),"\u043C\u0430\u043A\u0441. \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u0430 "+t.capabilities.maxTextureSize+" \xB7 \u0442\u0435\u043A\u0441\u0442\u0443\u0440 "+b.textures+" \xB7 \u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u0439 "+b.geometries+" \xB7 \u0448\u0435\u0439\u0434\u0435\u0440\u043E\u0432 "+(t.info.programs||[]).length+(this.diag.warm?" (\u0437\u0430\u0440\u0430\u043D\u0435\u0435 +"+this.diag.warm.programs+" \u0437\u0430 "+this.diag.warm.ms+" \u043C\u0441)":""),"\u043A\u0430\u0440\u0442\u0438\u043D\u044B "+m.gpuMB+"/"+m.budgetMB+" \u041C\u0411 \xB7 \u0430\u0442\u043B\u0430\u0441 "+m.atlasMB+" \u041C\u0411 \xB7 \u0443\u0440\u043E\u0432\u043D\u0438 "+m.byLevel.join("/")+" \xB7 \u0431\u0435\u0437 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438 "+m.noImage,"\u043A\u0430\u0434\u0440\u043E\u0432/\u0441 "+f.toFixed(0)+" \xB7 \u0432\u044B\u0437\u043E\u0432\u043E\u0432 "+t.info.render.calls,this.hitchLine(d),"\u043E\u0448\u0438\u0431\u043A\u0438 GL: "+this.diag.glErrors+(this.diag.lastGl?" ("+this.diag.lastGl+")":"")+" \xB7 \u043F\u043E\u0442\u0435\u0440\u044F \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430: "+this.diag.lost,"\u043E\u0448\u0438\u0431\u043A\u0438 \u0448\u0435\u0439\u0434\u0435\u0440\u043E\u0432: "+(this.diag.shaderErrors.length?`
`+this.diag.shaderErrors.join(`
`):"\u043D\u0435\u0442")].join(`
`),setTimeout(h,1e3)};h()}setNaturalLight(e){this.naturalLight=e;try{localStorage.setItem(Hp,e?"natural":"spots")}catch{}}stepNatural(e){let t=this.world.natural,n=this.naturalLight?1:0;t.value!==n&&(t.value=n>t.value?Math.min(1,t.value+e/.6):Math.max(0,t.value-e/.6),this.spots.dim=1-t.value,this.world.hemi.intensity=.55+.35*t.value)}offerSimple(){if(this.slowOffered||!this.bridge.simple)return;this.slowOffered=!0;let e=this.stage.querySelector(".artg-slow");e&&(e.hidden=!1)}hint(e){let t=this.stage.querySelector(".artg-hint");t&&(t.textContent=e,t.classList.add("is-on"),clearTimeout(this.hintT),this.hintT=setTimeout(()=>t.classList.remove("is-on"),6e3))}updateWhere(){let e=this.stage.querySelector(".artg-where b"),t=this.stage.querySelector(".artg-where span");if(this.room<0){e.textContent="\u0425\u043E\u043B\u043B",t.textContent="\u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043B",t.classList.remove("is-link");return}let n=this.plan.corridors[this.room],i=this.sub;e.textContent=(n.title||"\u042D\u043A\u0441\u043F\u043E\u0437\u0438\u0446\u0438\u044F")+(i?" \xB7 \u0437\u0430\u043B "+(i.idx+1)+" \u0438\u0437 "+n.rooms.length:""),t.textContent=this.bay?this.bridge.artists[this.bay.gi].name+" \u2192":"",t.classList.toggle("is-link",!!this.bay),t.title=this.bay?"\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0430":""}toggleMap(e){let t=this.stage.querySelector(".artg-map"),n=e==null?t.hidden:e;n&&this.closePanels(),t.hidden=!n,this.stage.classList.toggle("has-panel",this.anyPanel()),n&&(this.placePanels(),this.fillMap(),this.drawMap())}fillMap(){let e=this.sub,t='<button type="button" data-room="-1.0"'+(this.room<0?' class="is-here"':"")+">\u0425\u043E\u043B\u043B</button>";this.plan.corridors.forEach(s=>{t+='<p class="artg-panel__sec">'+ga(s.title||"\u042D\u043A\u0441\u043F\u043E\u0437\u0438\u0446\u0438\u044F")+"</p>",s.rooms.forEach(a=>{t+='<button type="button" data-room="'+s.i+"."+a.idx+'"'+(a===e?' class="is-here"':"")+">\u0417\u0430\u043B "+(a.idx+1)+"<i>"+ga(a.label||"")+"</i></button>"})});let n=this.stage.querySelector(".artg-map__list");n.innerHTML=t;let i=n.querySelector(".is-here");i&&i.scrollIntoView({block:"center"})}mapGeom(){let e=this.stage.querySelector(".artg-map__plan"),t=e.width,n=e.height,i=this.plan.corridors,s=Math.min(110,(t-40)/Math.max(1,i.length)-24),a=40,o=34,l=n-a-14,c=i.length*(s+24)-24,h=(t-c)/2;return{cv:e,W:t,H:n,cs:i,colW:s,hallH:a,top:o,bottom:l,x0:h,span:c}}drawMap(){let{cv:e,W:t,H:n,cs:i,colW:s,hallH:a,top:o,bottom:l,x0:c,span:h}=this.mapGeom(),u=e.getContext("2d"),d=this.nav,f=this.plan.hall;u.clearRect(0,0,t,n),u.font='500 17px "Helvetica Neue", Arial, sans-serif',u.textAlign="center";let m=c-12,b=h+24,g=n-a-6;u.fillStyle=this.room<0?"#2a2a2a":"#e2e1dd",u.fillRect(m,g,b,a),u.fillStyle=this.room<0?"#fff":"#8c8c88",u.fillText("\u0425\u041E\u041B\u041B",t/2,g+a/2+6);let p=(_,v)=>{u.fillStyle="#d4574f",u.beginPath(),u.arc(_,v,7,0,Math.PI*2),u.fill(),u.strokeStyle="#fff",u.lineWidth=2,u.stroke()};if(i.forEach((_,v)=>{let x=c+v*(s+24),E=(l-o)/_.rooms.length;if(u.fillStyle="#2a2a2a",u.fillText(_.title||"",x+s/2,20),_.rooms.forEach(w=>{let T=l-(w.idx+1)*E,I=w===this.sub;u.fillStyle=I?"#2a2a2a":"#e2e1dd",u.fillRect(x,T+1,s,Math.max(1,E-2)),u.fillStyle=I?"#6f6f6b":"#c9c8c4",u.fillRect(x+s/2-1,T+E*.22,2,E*.56)}),this.room===_.i&&this.sub){let w=this.sub,T=Math.max(0,Math.min(1,(w.z0-d.z)/(w.z0-w.z1))),I=s/2;p(x+s/2+(d.x-_.cx)/zp*I*.85,l-(w.idx+T)*E)}}),this.peers){u.font='500 13px "Helvetica Neue", Arial, sans-serif',u.textAlign="left";let _=[];for(let v of this.peers.dots()){let x,E,w=hs(this.plan,v.x,v.z);if(w<0)x=m+(v.x-f.x0)/(f.x1-f.x0)*b,E=g+a*Math.max(.2,Math.min(.8,(v.z-f.z0)/(f.z1-f.z0)));else{let T=i[w],I=jn(this.plan,v.x,v.z);if(!T||!I)continue;let S=c+w*(s+24),y=(l-o)/T.rooms.length,R=Math.max(0,Math.min(1,(I.z0-v.z)/(I.z0-I.z1)));x=S+s/2+(v.x-T.cx)/zp*(s/2)*.85,E=l-(I.idx+R)*y}u.fillStyle=v.color,u.beginPath(),u.arc(x,E,5.5,0,Math.PI*2),u.fill(),u.strokeStyle="#fff",u.lineWidth=2,u.stroke(),w>=0&&!_.some(T=>Math.abs(T[0]-x)<70&&Math.abs(T[1]-E)<16)&&(u.fillStyle="#2a2a2a",u.fillText(v.name,x+9,E+4),_.push([x,E]))}u.textAlign="center"}if(this.room<0){let _=(d.x-f.x0)/(f.x1-f.x0);p(m+_*b,g+a*Math.max(.2,Math.min(.8,(d.z-f.z0)/(f.z1-f.z0))))}}mapClick(e){let{cv:t,H:n,cs:i,colW:s,hallH:a,top:o,bottom:l,x0:c}=this.mapGeom(),h=t.getBoundingClientRect(),u=(e.clientX-h.left)*t.width/h.width,d=(e.clientY-h.top)*t.height/h.height;if(d>n-a-14){this.toggleMap(!1),this.goHall();return}i.forEach((f,m)=>{let b=c+m*(s+20);if(u<b||u>b+s||d<o||d>l)return;let g=Math.min(f.rooms.length-1,Math.floor((l-d)/((l-o)/f.rooms.length)));this.toggleMap(!1),this.goToSubRoom(f.i,g)})}hashFor(){if(this.focus){let e=this.bridge.artists[this.focus.gi];return"artc-work="+encodeURIComponent(e.id||this.focus.gi)+"/"+(this.focus.wi+1)}return this.sub?"artc-room="+(this.room+1)+"/"+(this.sub.idx+1):""}syncHash(){if(!this.revealed||!window.history||!history.replaceState)return;let e=location.hash;if(e&&!/^#artc-/.test(e))return;let t=this.hashFor();if(!((e||"#")==="#"+t||!e&&!t))try{history.replaceState(history.state,"",t?"#"+t:location.pathname+location.search)}catch{}}applyHash(){let e=decodeURIComponent(location.hash||""),t=e.match(/^#artc-work=([^/]+)\/(\d+)/);if(t){let n=this.bridge.artists.findIndex((s,a)=>String(s.id||a)===t[1]),i=this.allWorks.find(s=>s.gi===n&&s.wi===+t[2]-1);if(i){let s=ra(i);Object.assign(this.nav,{x:s.x,z:s.z,yaw:s.yaw,pitch:0}),this.focus=i,this.hint("\u0412\u044B \u0443 \u0440\u0430\u0431\u043E\u0442\u044B \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043D\u0435\u0451, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0432\u043E \u0432\u0435\u0441\u044C \u044D\u043A\u0440\u0430\u043D");return}}if(t=e.match(/^#artc-room=(\d+)\/(\d+)/),t){let n=this.plan.corridors[+t[1]-1],i=n&&n.rooms[+t[2]-1];i&&Object.assign(this.nav,{x:n.cx,z:i.z0-1.6,yaw:0,pitch:-.02})}}share(){this.syncHash();let e=location.href,t=this.focus?this.bridge.artists[this.focus.gi].name:"\u0410\u0440\u0442-\u0420\u043E\u0441\u0442\u043E\u0432 \u2014 \u0432\u0438\u0440\u0442\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0433\u0430\u043B\u0435\u0440\u0435\u044F";if(navigator.share&&this.touch){navigator.share({title:t,url:e}).catch(()=>{});return}let n=()=>this.hint("\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u044D\u0442\u043E \u043C\u0435\u0441\u0442\u043E \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430");navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(e).then(n,()=>this.hint(e)):this.hint(e)}bindInput(){let e=this.stage,t=this.nav,n=null,i=o=>o.target&&o.target.closest&&o.target.closest(".artc-modal, .artc-live, .artc-live-toasts");e.addEventListener("pointerdown",o=>{if(i(o)){n=null;return}if(!o.target.closest(".artg-slow, .artg-enter, .artg-top, .artg-menu, .artg-panel, .artg-move, .artg-map, .artg-qpanel, .artg-tour, .artg-joy, .artg-say, .artc-cur")){if(this.curator&&this.curator.unblock(),this.anyPanel()){this.closePanels();return}this.tour.running&&this.tour.stop(),n={x:o.clientX,y:o.clientY,lx:o.clientX,ly:o.clientY,t:performance.now(),id:o.pointerId,moved:!1},e.focus({preventScroll:!0})}}),e.addEventListener("pointermove",o=>{if(n&&n.id===o.pointerId){let l=o.clientX-n.lx,c=o.clientY-n.ly;if(n.lx=o.clientX,n.ly=o.clientY,!n.moved&&Math.hypot(o.clientX-n.x,o.clientY-n.y)>6){n.moved=!0,t.cancel();try{e.setPointerCapture(o.pointerId)}catch{}}if(n.moved){let h=(this.touch?1.25:1)*this.camera.fov/62/this.stage.clientHeight*1.9;t.look(l*h,c*h)}}else!this.touch&&!i(o)&&this.hoverAt(o)});let s=o=>{if(!n||n.id!==o.pointerId)return;let l=!n.moved&&performance.now()-n.t<700;if(n=null,!l||o.type!=="pointerup")return;let c={clientX:o.clientX,clientY:o.clientY};this.pendingTap=c,clearTimeout(this.tapT),this.tapT=setTimeout(()=>{this.pendingTap===c&&(this.pendingTap=null,this.clickAt(c))},400)};e.addEventListener("pointerup",s),e.addEventListener("pointerleave",()=>{this.marks.hover(null),this.setHover(null)}),e.addEventListener("pointercancel",s),e.addEventListener("click",o=>{if(i(o)){this.pendingTap=null,clearTimeout(this.tapT);return}let l=this.pendingTap;l&&(this.pendingTap=null,clearTimeout(this.tapT),this.clickAt(l))}),e.addEventListener("wheel",o=>{o.ctrlKey||i(o)||(o.preventDefault(),this.tour.running&&this.tour.stop(),t.cancel(),t.wheel=Math.max(-14,Math.min(14,t.wheel-o.deltaY*.012)))},{passive:!1});let a=o=>o.target&&/^(INPUT|TEXTAREA|SELECT)$/.test(o.target.tagName);this.onKeyDown=o=>{a(o)||this.modalOpen()||!e.contains(document.activeElement)&&document.activeElement!==e||(/^(Arrow|Key[WASDQE])/.test(o.code)&&this.tour.running&&this.tour.stop(),/^(Arrow|Key[WASDQE]|Shift)/.test(o.code)&&(t.keys[o.code]=!0,/^Arrow/.test(o.code)&&o.preventDefault()),o.code==="Escape"&&this.togglePanel(!1),o.code==="Enter"&&this.focus&&this.bridge.openWork(this.focus.gi,this.focus.wi))},this.onKeyUp=o=>{t.keys[o.code]=!1},this.onBlur=()=>{t.keys={},t.hold=0},document.addEventListener("keydown",this.onKeyDown),document.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur)}modalOpen(){return!!document.querySelector(".artc-modal.is-open")}pick(e){let t=this.canvas.getBoundingClientRect(),n=new G((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1);this.ray.setFromCamera(n,this.camera);let i=this.ray.intersectObjects(this.world.pickables,!1);for(let s of i){let a=s.object,o=!0;for(;a;){if(!a.visible){o=!1;break}a=a.parent}if(o&&!(s.object.userData.curator&&!this.curator.hit(s.uv)))return s.object.userData.blocker?null:s}return null}hoverAt(e){let t=performance.now();if(t-(this.hoverT||0)<60)return;this.hoverT=t;let n=this.pick(e),i=n&&n.object.userData,s=i&&(i.art||i.plaque||i.action||i.banner||i.curator||i.peer);this.stage.style.cursor=s?"pointer":"",this.setHover(i&&(i.plaque||i.banner)?n.object:null);let a=null;i&&i.floor&&!this.nav.path&&Bn(this.plan,n.point.x,n.point.z)&&(a=n.point),this.marks.hover(a),a&&(this.stage.style.cursor="pointer")}placeHints(){let e=this.nav,t=[];if(!e.path&&!this.tour.running&&this.room>=0){let n=this.plan.corridors[this.room],i=this.camera,s=new P;for(let a of[-1,1]){let o=qt(n,a);for(let l=-4;l<=4;l++){let c=Math.round(e.z/3)*3+l*3,h=Math.hypot(o-e.x,c-e.z);h<2.5||h>13||!Bn(this.plan,o,c)||(s.set(o,0,c).project(i),!(s.z>1||Math.abs(s.x)>.9||s.y>.2||s.y<-.95)&&t.push([o,c,h]))}}t.sort((a,o)=>a[2]-o[2])}this.marks.showHints(t.slice(0,6))}setHover(e){if(e===this.hovered)return;let t=(n,i)=>{if(!n)return;let s=i?1.06:1;(n.userData.banner?this.world.banners.get(n.userData.banner)||[n]:[n]).forEach(o=>{o.scale.set(s,s,1)}),n.material.emissive&&n.material.emissive.setHex(i?1842204:0)};t(this.hovered,!1),this.hovered=e,t(e,!0)}clickAt(e){let t=this.pick(e);if(!t)return;let n=t.object.userData;if(n.art)this.focus===n.art?this.bridge.openWork(n.art.gi,n.art.wi):this.focusArt(n.art,()=>{this.touch||this.hint("\u0429\u0451\u043B\u043A\u043D\u0438\u0442\u0435 \u043F\u043E \u043A\u0430\u0440\u0442\u0438\u043D\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0435\u0451 \u0432\u043E \u0432\u0435\u0441\u044C \u044D\u043A\u0440\u0430\u043D")});else if(n.plaque)this.focusArt(n.plaque,()=>this.bridge.openArtist(n.plaque.gi));else if(n.banner)this.bridge.openArtist(n.banner.gi);else if(n.curator)this.askCurator();else if(n.peer){let i=this.peers&&this.peers.hitId(t);i&&this.bridge.livePick&&this.bridge.livePick(i)}else if(n.action){let i=n.action;i.type==="enter"?this.goToRoom(i.room):i.type==="hall"?this.goHall():i.type==="url"&&window.open(i.href,"_blank","noopener")}else if(n.floor){this.focus=null;let i=this.nav.clampToPlan(t.point.x,t.point.z);i&&(this.nav.goTo(i.x,i.z,null),this.marks.target(i.x,i.z))}}askCurator(){this.bridge.curator&&(this.tour.running&&this.tour.stop(),this.closePanels(),this.nav.keys={},this.bridge.curator(this.stage))}placeSay(){let e=this.say;if(!e)return;let t=this.stage,n=this.stageW||t.clientWidth,i=this.stageH||t.clientHeight,s=null;this.revealed&&this.curator.ready&&this.room<0&&!this.tour.running&&!t.classList.contains("has-cur")&&!t.classList.contains("has-panel")&&!t.classList.contains("has-enter")&&(s=this.curator.head(this.camera,n,i),s&&(s.d>15||s.d<1.2||s.x<12||s.x>n-60||s.y<70||s.y>i-40)&&(s=null));let a=!!s;a!==this.sayOn&&(this.sayOn=a,e.classList.toggle("is-on",a)),a&&(e.style.transform="translate("+Math.round(s.x-20)+"px,"+Math.round(s.y-10)+"px) translateY(-100%)")}travel(e,t,n,i,s){if(!(Math.hypot(e-this.nav.x,t-this.nav.z)>70)){this.nav.goTo(e,t,n,i,s);return}let o=this.stage.querySelector(".artg-fade");o.classList.add("is-on"),this.nav.cancel(),clearTimeout(this.travelT),this.travelT=setTimeout(()=>{if(this.dead)return;let l=this.plan.corridors[hs(this.plan,e,t)],c=l&&jn(this.plan,e,t);if(c){let h=qt(l,e<l.cx?-1:1);this.nav.x=h,this.nav.z=Math.min(t+3.5,c.z0-.8),Bn(this.plan,this.nav.x,this.nav.z)||(this.nav.z=t)}else this.nav.x=e,this.nav.z=t;this.nav.yaw=0,this.nav.goTo(e,t,n,i,s),o.classList.remove("is-on")},320)}focusArt(e,t){this.focus=e;let n=ra(e),i=Math.atan2(1.72-1.62,Math.abs(n.x-e.x))*.8;this.travel(n.x,n.z,n.yaw,i,t)}goToRoom(e){let t=this.plan.corridors[e];t&&(this.focus=null,this.travel(t.cx,t.rooms[0].z0-1.8,0,-.02))}goToSubRoom(e,t){let n=this.plan.corridors[e],i=n&&n.rooms[t];i&&(this.focus=null,this.travel(n.cx,i.z0-1.6,0,-.02))}goHall(){this.focus=null;let e=this.plan.hall,t=this.plan.corridors[this.room];this.travel(t?t.cx:0,e.z1-5,0,-.02)}goToArtist(e){for(let t of this.allWorks)if(t.gi===e){this.focusArt(t);return}}onReturn(){if(!this.focus)return;let e=this.focus;this.focus=null;let t=ra(e),n=t.x-e.side*1.1;Bn(this.plan,n,t.z)&&this.nav.goTo(n,t.z,t.yaw,-.02),this.hint(this.touch?"\u0412\u044B \u0441\u043D\u043E\u0432\u0430 \u0432 \u0437\u0430\u043B\u0435 \u2014 \u043A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u043F\u043E\u043B\u0430, \u0447\u0442\u043E\u0431\u044B \u0438\u0434\u0442\u0438 \u0434\u0430\u043B\u044C\u0448\u0435":"\u0412\u044B \u0441\u043D\u043E\u0432\u0430 \u0432 \u0437\u0430\u043B\u0435 \u2014 \u0438\u0434\u0438\u0442\u0435 \u0434\u0430\u043B\u044C\u0448\u0435")}toggleFullscreen(){if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document);return}if(this.fsFake){this.fakeFs(!1);return}let t=this.stage.requestFullscreen||this.stage.webkitRequestFullscreen;if(!t){this.fakeFs(!0);return}try{let n=t.call(this.stage);n&&n.catch&&n.catch(()=>this.fakeFs(!0))}catch{this.fakeFs(!0)}}enterShow(e){let t=this.stage.querySelector(".artg-enter"),n=this.touch&&window.innerWidth<=900;e===void 0&&(e=this.revealed&&!this.stage.classList.contains("is-fs")&&(n||!this.entered)),t.hidden=!e,this.stage.classList.toggle("has-enter",!!e)}fakeFs(e){this.fsFake=e,e?(this.slot=document.createComment("artg"),this.stage.parentNode.insertBefore(this.slot,this.stage),this.fsHost=document.createElement("div"),this.fsHost.className="artc-root artg-fs-host",document.body.appendChild(this.fsHost),this.fsHost.appendChild(this.stage),document.body.style.overflow="hidden"):this.fsHost&&(this.slot.parentNode.insertBefore(this.stage,this.slot),this.slot.parentNode.removeChild(this.slot),this.fsHost.parentNode.removeChild(this.fsHost),this.fsHost=null,document.body.style.overflow=""),this.onFsChange()}onFsChange(){let e=document.fullscreenElement||document.webkitFullscreenElement,t=e===this.stage||this.fsFake;this.stage.classList.toggle("is-fs",!!t),t&&(this.entered=!0),this.enterShow(),this.bridge.onFullscreen&&this.bridge.onFullscreen(e===this.stage?this.stage:this.fsFake?this.fsHost:null),this.resize()}resize(){let e=this.stage.clientWidth,t=this.stage.clientHeight;!e||!t||(this.stageW=e,this.stageH=t,this.stage.classList.toggle("is-narrow",e<560),this.stage.classList.toggle("is-compact",e<960),this.anyPanel&&this.stage.querySelector(".artg-top")&&this.placePanels(),this.renderer.setSize(e,t,!1),this.quality&&this.quality.resize(e,t),this.camera.aspect=e/t,this.camera.fov=e/t<.9?74:e/t<1.3?66:60,this.camera.updateProjectionMatrix())}loop(e){if(this.dead)return;this.raf=requestAnimationFrame(this.loop);let t=e-this.last,n=Math.min(.1,t/1e3);this.last=e;let i=this.prof;if(this.revealed&&t>50&&i.on&&this.noteHitch(t,i),i.on=!1,i.build=i.tex=i.probe=i.render=i.prog=0,!(this.visible||this.fsFake||(document.fullscreenElement||document.webkitFullscreenElement)===this.stage)||document.hidden||this.modalOpen()){this.curator&&this.curator.play(!1);return}i.on=!0;let a=this.nav;a.update(n);let o=this.camera,l=Math.hypot(a.x-this.lastPos.x,a.z-this.lastPos.z);this.lastPos.x=a.x,this.lastPos.z=a.z;let c=n>0?l/n:0,h=!a.path&&c>.3&&c<6;this.bobAmp+=((h?1:0)-this.bobAmp)*Math.min(1,n*4),c<6&&(this.bobPhase+=l/.72*Math.PI);let u=e/1e3,d=-.014*(1-Math.cos(2*this.bobPhase))/2*this.bobAmp,f=.007*Math.sin(this.bobPhase)*this.bobAmp,m=.0035*Math.sin(u*1.5);if(o.position.set(a.x+Math.cos(a.yaw)*f,1.62+d+m,a.z-Math.sin(a.yaw)*f),o.rotation.set(a.pitch+.0012*Math.sin(u*1.5+1),a.yaw,.0028*Math.sin(this.bobPhase)*this.bobAmp),this.world.camLight.position.set(a.x,1.62+.6,a.z),this.curator){this.curator.face(o);let x=this.curator.pos;this.curator.play(this.room<0&&Math.hypot(a.x-x.x,a.z-x.z)<30),this.placeSay()}if(this.peers&&this.peers.update(n,o),this.tick++%6===0){this.world.update(a),this.world.eco&&this.tick%60===0&&this.world.ecoSweep(),this.spots.assign(this.world.paintings,o);let x=performance.now();this.tex.update(this.world.paintings,o),i.tex+=performance.now()-x;let E=a.room,w=jn(this.plan,a.x,a.z),T=null;if(w){let S=this.plan.corridors[E],y=a.x<S.cx?-1:1;for(let R of w.bays)if(R.aisle===y&&a.z<=R.z0+.6&&a.z>=R.z1-.6){T=R;break}}if(E!==this.room||T!==this.bay||w!==this.sub){let S=E!==this.room;this.room=E,this.sub=w,this.bay=T,this.updateWhere(),S&&this.bridge.onRoom&&this.bridge.onRoom(E)}if(this.focus&&!a.path){let S=ra(this.focus);Math.hypot(S.x-a.x,S.z-a.z)>2.5&&(this.focus=null)}a.path||this.syncHash(),this.touch&&this.placeHints(),!this.stage.querySelector(".artg-map").hidden&&this.tick%12===1&&this.drawMap()}this.bridge.onMove&&this.tick%3===1&&this.bridge.onMove(this.room,this.sub?this.sub.idx:-1,a.x,a.z,a.yaw);let b=performance.now();this.tex.flush(),this.marks.update(n,!!a.path),i.tex+=performance.now()-b,this.props.update(n,a,c,this.sub),this.stepNatural(n),this.spots.update(n),this.renderer.shadowMap.enabled&&(this.spots.moved||this.tick%4===0)&&(this.renderer.shadowMap.needsUpdate=!0,this.spots.moved=!1),this.sound.update(l,n,this.room<0),this.atmo.update(o,this.pr,this.stageH||this.stage.clientHeight),b=performance.now(),this.updateVisibility();let g=performance.now();this.updateProbe();let p=performance.now(),_=(this.renderer.info.programs||[]).length;this.quality.render(),i.build+=g-b,i.probe+=p-g,i.render+=performance.now()-p,i.prog+=(this.renderer.info.programs||[]).length-_;let v=Math.abs(a.yaw-(this.lastYaw||0))+Math.abs(a.pitch-(this.lastPitch||0));this.lastYaw=a.yaw,this.lastPitch=a.pitch,this.revealed&&this.quality.frame(Math.min(t,1e3),l>1e-4||v>1e-4||!!a.path)}hitchLine(e){let t=this.diag.hitches.filter(s=>e-s.t<3e4);if(!t.length)return"\u0440\u044B\u0432\u043A\u043E\u0432 \u0437\u0430 30 \u0441: 0";let n={};t.forEach(s=>{let a=s.cause.replace(/ \+\d+$/,"");n[a]=(n[a]||0)+1});let i=t.reduce((s,a)=>a.ms>s.ms?a:s);return"\u0440\u044B\u0432\u043A\u043E\u0432 \u0437\u0430 30 \u0441: "+t.length+" \xB7 \u0445\u0443\u0434\u0448\u0438\u0439 "+Math.round(i.ms)+" \u043C\u0441 ("+i.cause+`)
  `+Object.keys(n).sort((s,a)=>n[a]-n[s]).map(s=>s+" "+n[s]).join(" \xB7 ")}noteHitch(e,t){let n={"\u0441\u0431\u043E\u0440\u043A\u0430 \u0437\u0430\u043B\u0430":t.build,\u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438:t.tex,\u043E\u0442\u0440\u0430\u0436\u0435\u043D\u0438\u044F:t.probe,\u043E\u0442\u0440\u0438\u0441\u043E\u0432\u043A\u0430:t.render},i="\u0432\u0438\u0434\u0435\u043E\u0447\u0438\u043F/\u0431\u0440\u0430\u0443\u0437\u0435\u0440",s=8;for(let o in n)n[o]>s&&(s=n[o],i=o);t.prog>0&&(i="\u0448\u0435\u0439\u0434\u0435\u0440\u044B +"+t.prog);let a=this.diag.hitches;a.push({t:performance.now(),ms:e,cause:i}),a.length>200&&a.shift()}warm(){this.warmed=!0;let e=performance.now();this.bridge.onProgress&&this.bridge.onProgress(.95);let t=this.renderer,n=this.scene,i=()=>(t.info.programs||[]).length,s=i(),a=()=>t.compileAsync?t.compileAsync(n,this.camera):Promise.resolve(),o=[],l=[],c=()=>{o.forEach(h=>{h.visible=!1}),o.length=0};try{let h=new Set;this.plan.corridors.forEach(_=>_.rooms.slice(0,2).forEach(v=>{this.world.ensureRoom(v),h.add(v)})),this.world.setVisible(!0,h,null,this.camera);let u=this.world.probeSpot(null),d=this.atmo.on;this.atmo.setEnabled(!1),this.probe.capture(u,u.pos),this.atmo.setEnabled(!0),n.traverse(_=>{_.isRectAreaLight&&l.push(_),!_.visible&&!_.isLight&&_.parent&&_.parent.visible&&(_.visible=!0,o.push(_))});let f=l.map(_=>_.visible),m=this.quality,b=[m.composer?m.composer.readBuffer:null];this.probe.off||b.push(this.probe.rt);let g=()=>{let _=t.getRenderTarget(),v=n.fog,x=b.map(E=>{t.setRenderTarget(E),E===this.probe.rt&&(n.fog=null);let w=a();return n.fog=v,w});return t.setRenderTarget(_),Promise.all(x)},p=g().then(()=>(l.forEach(_=>{_.visible=!1}),g())).then(()=>{l.forEach((_,v)=>{_.visible=f[v]}),this.world.applyLights()});return Promise.race([p,new Promise(_=>setTimeout(_,6e3))]).catch(()=>{}).then(()=>{this.dead||(c(),l.forEach((_,v)=>{_.visible=f[v]}),this.world.applyLights(),this.atmo.setEnabled(d),this.quality.render(),this.updateVisibility(),this.diag.warm={ms:Math.round(performance.now()-e),programs:i()-s},this.bridge.onProgress&&this.bridge.onProgress(1))})}catch{return c(),Promise.resolve()}}updateVisibility(){let e=this.nav;if(this.cull){let i=ap(this.plan,this.camera,e.x,e.z);this.world.setVisible(i.hall,i.rooms,i.win,this.camera)}else this.allRooms||(this.allRooms=new Set([].concat(...this.plan.corridors.map(i=>i.rooms)))),this.world.setVisible(!0,this.allRooms);let t=this.world;if(t.pendingProps.length){let i=t.pendingProps[0],s=i.group.visible;t.roomProps(i,!1),i.group.visible=s;return}let n=this.sub;if(n&&this.tick%3===0){let i=this.plan.corridors[n.sec].rooms;for(let s of[1,-1,2,-2]){let a=i[n.idx+s];if(a&&t.ensureRoom(a,!1)){a.group.visible=!1;break}}}}updateProbe(){if(!this.revealed)return;if(this.probeJob){this.probeFrame(this.probeJob);return}let e=this.world.probeSpot(this.sub);if(e.key===this.probeKey)return;if(e.key!==this.probeWant){this.probeWant=e.key,this.probeAt=performance.now()+1900;return}if(performance.now()<this.probeAt)return;let t=new Set;if(e.room){let n=e.room.sectionRef.rooms;[e.room.idx-1,e.room.idx,e.room.idx+1].forEach(i=>{n[i]&&t.add(n[i])})}else this.plan.corridors.forEach(n=>t.add(n.rooms[0]));this.probeKey=e.key,this.probe.begin(e,e.pos)&&(this.probeJob={hall:!e.room||e.room.idx===0,rooms:t},this.probeFrame(this.probeJob))}probeFrame(e){this.world.setVisible(e.hall,e.rooms,null,this.camera);let t=this.atmo.on;this.atmo.setEnabled(!1);let n=this.probe.step();this.atmo.setEnabled(t),n&&(this.probeJob=null),this.updateVisibility()}destroy(){this.dead=!0,cancelAnimationFrame(this.raf),[this.revealT,this.showT,this.hintT,this.tapT,this.travelT].forEach(clearTimeout),this.tour&&this.tour.stop(),this.tex&&this.tex.close(),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),document.removeEventListener("fullscreenchange",this.fsHandler),document.removeEventListener("webkitfullscreenchange",this.fsHandler),this.ro&&this.ro.disconnect(),this.io&&this.io.disconnect(),clearTimeout(this.revealT),this.fsFake&&this.fakeFs(!1),this.quality&&this.quality.dropComposer(),this.peers&&this.peers.dispose(),this.probe&&this.probe.dispose(),this.curator&&this.curator.dispose(),this.sound&&this.sound.dispose(),this.onVis&&document.removeEventListener("visibilitychange",this.onVis),this.freeScene(),this.renderer&&(this.renderer.dispose(),this.renderer.forceContextLoss()),window.ArtGallery&&window.ArtGallery.last===this&&(window.ArtGallery.last=null)}freeScene(){let e=this.scene;if(!e)return;let t=new Set,n=s=>{s&&s.isTexture&&!t.has(s)&&(t.add(s),s.dispose())},i=s=>{if(!(!s||t.has(s))){t.add(s);for(let a in s)n(s[a]);if(s.uniforms)for(let a in s.uniforms){let o=s.uniforms[a]&&s.uniforms[a].value;n(o)}s.dispose()}};if(e.traverse(s=>{s.geometry&&!t.has(s.geometry)&&(t.add(s.geometry),s.geometry.dispose()),Array.isArray(s.material)?s.material.forEach(i):i(s.material),s.dispose&&s.isLight&&s.dispose()}),n(e.environment),n(e.background),this.world&&this.world.pbr)for(let s in this.world.pbr.cache)n(this.world.pbr.cache[s])}};window.ArtGallery={version:Jy,supported(){if(this.ok!=null)return this.ok;try{let r=document.createElement("canvas").getContext("webgl2");this.ok=!!r;let e=r&&r.getExtension("WEBGL_lose_context");e&&e.loseContext()}catch{this.ok=!1}return this.ok},create(r,e){let t=new Yu(r,e);return t.dead?null:(this.last=t,t)}};})();
