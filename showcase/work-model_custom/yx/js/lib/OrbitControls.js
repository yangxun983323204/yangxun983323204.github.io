THREE.OrbitControls=function(e,t){if(t===undefined)console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.');if(t===document)console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.');this.object=e;this.domElement=t;this.enabled=true;this.target=new THREE.Vector3;this.minDistance=0;this.maxDistance=Infinity;this.minZoom=0;this.maxZoom=Infinity;this.minPolarAngle=0;this.maxPolarAngle=Math.PI;this.minAzimuthAngle=-Infinity;this.maxAzimuthAngle=Infinity;this.enableDamping=false;this.dampingFactor=.05;this.enableZoom=true;this.zoomSpeed=1;this.enableRotate=true;this.rotateSpeed=1;this.enablePan=true;this.panSpeed=1;this.screenSpacePanning=true;this.keyPanSpeed=7;this.autoRotate=false;this.autoRotateSpeed=2;this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"};this.mouseButtons={LEFT:THREE.MOUSE.ROTATE,MIDDLE:THREE.MOUSE.DOLLY,RIGHT:THREE.MOUSE.PAN};this.touches={ONE:THREE.TOUCH.ROTATE,TWO:THREE.TOUCH.DOLLY_PAN};this.target0=this.target.clone();this.position0=this.object.position.clone();this.zoom0=this.object.zoom;this._domElementKeyEvents=null;this.getPolarAngle=function(){return f.phi};this.getAzimuthalAngle=function(){return f.theta};this.listenToKeyEvents=function(e){e.addEventListener("keydown",re);this._domElementKeyEvents=e};this.saveState=function(){u.target0.copy(u.target);u.position0.copy(u.object.position);u.zoom0=u.object.zoom};this.reset=function(){u.target.copy(u.target0);u.object.position.copy(u.position0);u.object.zoom=u.zoom0;u.object.updateProjectionMatrix();u.dispatchEvent(E);u.update();h=m.NONE};this.update=function(){var o=new THREE.Vector3;var r=(new THREE.Quaternion).setFromUnitVectors(e.up,new THREE.Vector3(0,1,0));var i=r.clone().invert();var s=new THREE.Vector3;var c=new THREE.Quaternion;var l=2*Math.PI;return function e(){var t=u.object.position;o.copy(t).sub(u.target);o.applyQuaternion(r);f.setFromVector3(o);if(u.autoRotate&&h===m.NONE){P(H())}if(u.enableDamping){f.theta+=d.theta*u.dampingFactor;f.phi+=d.phi*u.dampingFactor}else{f.theta+=d.theta;f.phi+=d.phi}var n=u.minAzimuthAngle;var a=u.maxAzimuthAngle;if(isFinite(n)&&isFinite(a)){if(n<-Math.PI)n+=l;else if(n>Math.PI)n-=l;if(a<-Math.PI)a+=l;else if(a>Math.PI)a-=l;if(n<=a){f.theta=Math.max(n,Math.min(a,f.theta))}else{f.theta=f.theta>(n+a)/2?Math.max(n,f.theta):Math.min(a,f.theta)}}f.phi=Math.max(u.minPolarAngle,Math.min(u.maxPolarAngle,f.phi));f.makeSafe();f.radius*=b;f.radius=Math.max(u.minDistance,Math.min(u.maxDistance,f.radius));if(u.enableDamping===true){u.target.addScaledVector(T,u.dampingFactor)}else{u.target.add(T)}o.setFromSpherical(f);o.applyQuaternion(i);t.copy(u.target).add(o);u.object.lookAt(u.target);if(u.enableDamping===true){d.theta*=1-u.dampingFactor;d.phi*=1-u.dampingFactor;T.multiplyScalar(1-u.dampingFactor)}else{d.set(0,0,0);T.set(0,0,0)}b=1;if(v||s.distanceToSquared(u.object.position)>p||8*(1-c.dot(u.object.quaternion))>p){u.dispatchEvent(E);s.copy(u.object.position);c.copy(u.object.quaternion);v=false;return true}return false}}();this.dispose=function(){u.domElement.removeEventListener("contextmenu",le);u.domElement.removeEventListener("pointerdown",J);u.domElement.removeEventListener("wheel",oe);u.domElement.removeEventListener("touchstart",ie);u.domElement.removeEventListener("touchend",ce);u.domElement.removeEventListener("touchmove",se);u.domElement.ownerDocument.removeEventListener("pointermove",$);u.domElement.ownerDocument.removeEventListener("pointerup",ee);if(u._domElementKeyEvents!==null){u._domElementKeyEvents.removeEventListener("keydown",re)}};var u=this;var E={type:"change"};var n={type:"start"};var a={type:"end"};var m={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};var h=m.NONE;var p=1e-6;var f=new THREE.Spherical;var d=new THREE.Spherical;var b=1;var T=new THREE.Vector3;var v=false;var o=new THREE.Vector2;var r=new THREE.Vector2;var i=new THREE.Vector2;var s=new THREE.Vector2;var c=new THREE.Vector2;var l=new THREE.Vector2;var O=new THREE.Vector2;var g=new THREE.Vector2;var R=new THREE.Vector2;function H(){return 2*Math.PI/60/60*u.autoRotateSpeed}function y(){return Math.pow(.95,u.zoomSpeed)}function P(e){d.theta-=e}function w(e){d.phi-=e}var A=function(){var a=new THREE.Vector3;return function e(t,n){a.setFromMatrixColumn(n,0);a.multiplyScalar(-t);T.add(a)}}();var L=function(){var a=new THREE.Vector3;return function e(t,n){if(u.screenSpacePanning===true){a.setFromMatrixColumn(n,1)}else{a.setFromMatrixColumn(n,0);a.crossVectors(u.object.up,a)}a.multiplyScalar(t);T.add(a)}}();var N=function(){var i=new THREE.Vector3;return function e(t,n){var a=u.domElement;if(u.object.isPerspectiveCamera){var o=u.object.position;i.copy(o).sub(u.target);var r=i.length();r*=Math.tan(u.object.fov/2*Math.PI/180);A(2*t*r/a.clientHeight,u.object.matrix);L(2*n*r/a.clientHeight,u.object.matrix)}else if(u.object.isOrthographicCamera){A(t*(u.object.right-u.object.left)/u.object.zoom/a.clientWidth,u.object.matrix);L(n*(u.object.top-u.object.bottom)/u.object.zoom/a.clientHeight,u.object.matrix)}else{console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");u.enablePan=false}}}();function M(e){if(u.object.isPerspectiveCamera){b/=e}else if(u.object.isOrthographicCamera){u.object.zoom=Math.max(u.minZoom,Math.min(u.maxZoom,u.object.zoom*e));u.object.updateProjectionMatrix();v=true}else{console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");u.enableZoom=false}}function j(e){if(u.object.isPerspectiveCamera){b*=e}else if(u.object.isOrthographicCamera){u.object.zoom=Math.max(u.minZoom,Math.min(u.maxZoom,u.object.zoom/e));u.object.updateProjectionMatrix();v=true}else{console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");u.enableZoom=false}}function k(e){o.set(e.clientX,e.clientY)}function C(e){O.set(e.clientX,e.clientY)}function D(e){s.set(e.clientX,e.clientY)}function S(e){r.set(e.clientX,e.clientY);i.subVectors(r,o).multiplyScalar(u.rotateSpeed);var t=u.domElement;P(2*Math.PI*i.x/t.clientHeight);w(2*Math.PI*i.y/t.clientHeight);o.copy(r);u.update()}function Y(e){g.set(e.clientX,e.clientY);R.subVectors(g,O);if(R.y>0){M(y())}else if(R.y<0){j(y())}O.copy(g);u.update()}function U(e){c.set(e.clientX,e.clientY);l.subVectors(c,s).multiplyScalar(u.panSpeed);N(l.x,l.y);s.copy(c);u.update()}function x(){}function I(e){if(e.deltaY<0){j(y())}else if(e.deltaY>0){M(y())}u.update()}function V(e){var t=false;switch(e.code){case u.keys.UP:N(0,u.keyPanSpeed);t=true;break;case u.keys.BOTTOM:N(0,-u.keyPanSpeed);t=true;break;case u.keys.LEFT:N(u.keyPanSpeed,0);t=true;break;case u.keys.RIGHT:N(-u.keyPanSpeed,0);t=true;break}if(t){e.preventDefault();u.update()}}function _(e){if(e.touches.length==1){o.set(e.touches[0].pageX,e.touches[0].pageY)}else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX);var n=.5*(e.touches[0].pageY+e.touches[1].pageY);o.set(t,n)}}function z(e){if(e.touches.length==1){s.set(e.touches[0].pageX,e.touches[0].pageY)}else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX);var n=.5*(e.touches[0].pageY+e.touches[1].pageY);s.set(t,n)}}function X(e){var t=e.touches[0].pageX-e.touches[1].pageX;var n=e.touches[0].pageY-e.touches[1].pageY;var a=Math.sqrt(t*t+n*n);O.set(0,a)}function F(e){if(u.enableZoom)X(e);if(u.enablePan)z(e)}function Z(e){if(u.enableZoom)X(e);if(u.enableRotate)_(e)}function K(e){if(e.touches.length==1){r.set(e.touches[0].pageX,e.touches[0].pageY)}else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX);var n=.5*(e.touches[0].pageY+e.touches[1].pageY);r.set(t,n)}i.subVectors(r,o).multiplyScalar(u.rotateSpeed);var a=u.domElement;P(2*Math.PI*i.x/a.clientHeight);w(2*Math.PI*i.y/a.clientHeight);o.copy(r)}function B(e){if(e.touches.length==1){c.set(e.touches[0].pageX,e.touches[0].pageY)}else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX);var n=.5*(e.touches[0].pageY+e.touches[1].pageY);c.set(t,n)}l.subVectors(c,s).multiplyScalar(u.panSpeed);N(l.x,l.y);s.copy(c)}function G(e){var t=e.touches[0].pageX-e.touches[1].pageX;var n=e.touches[0].pageY-e.touches[1].pageY;var a=Math.sqrt(t*t+n*n);g.set(0,a);R.set(0,Math.pow(g.y/O.y,u.zoomSpeed));M(R.y);O.copy(g)}function W(e){if(u.enableZoom)G(e);if(u.enablePan)B(e)}function q(e){if(u.enableZoom)G(e);if(u.enableRotate)K(e)}function Q(){}function J(e){if(u.enabled===false)return;switch(e.pointerType){case"mouse":case"pen":te(e);break}}function $(e){if(u.enabled===false)return;switch(e.pointerType){case"mouse":case"pen":ne(e);break}}function ee(e){switch(e.pointerType){case"mouse":case"pen":ae(e);break}}function te(e){u.domElement.focus?u.domElement.focus():window.focus();var t;switch(e.button){case 0:t=u.mouseButtons.LEFT;break;case 1:t=u.mouseButtons.MIDDLE;break;case 2:t=u.mouseButtons.RIGHT;break;default:t=-1}switch(t){case THREE.MOUSE.DOLLY:if(u.enableZoom===false)return;C(e);h=m.DOLLY;break;case THREE.MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(u.enablePan===false)return;D(e);h=m.PAN}else{if(u.enableRotate===false)return;k(e);h=m.ROTATE}break;case THREE.MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(u.enableRotate===false)return;k(e);h=m.ROTATE}else{if(u.enablePan===false)return;D(e);h=m.PAN}break;default:h=m.NONE}if(h!==m.NONE){u.domElement.ownerDocument.addEventListener("pointermove",$);u.domElement.ownerDocument.addEventListener("pointerup",ee);u.dispatchEvent(n)}}function ne(e){if(u.enabled===false)return;e.preventDefault();switch(h){case m.ROTATE:if(u.enableRotate===false)return;S(e);break;case m.DOLLY:if(u.enableZoom===false)return;Y(e);break;case m.PAN:if(u.enablePan===false)return;U(e);break}}function ae(e){u.domElement.ownerDocument.removeEventListener("pointermove",$);u.domElement.ownerDocument.removeEventListener("pointerup",ee);if(u.enabled===false)return;x(e);u.dispatchEvent(a);h=m.NONE}function oe(e){if(u.enabled===false||u.enableZoom===false||h!==m.NONE&&h!==m.ROTATE)return;e.preventDefault();u.dispatchEvent(n);I(e);u.dispatchEvent(a)}function re(e){if(u.enabled===false||u.enablePan===false)return;V(e)}function ie(e){if(u.enabled===false)return;e.preventDefault();switch(e.touches.length){case 1:switch(u.touches.ONE){case THREE.TOUCH.ROTATE:if(u.enableRotate===false)return;_(e);h=m.TOUCH_ROTATE;break;case THREE.TOUCH.PAN:if(u.enablePan===false)return;z(e);h=m.TOUCH_PAN;break;default:h=m.NONE}break;case 2:switch(u.touches.TWO){case THREE.TOUCH.DOLLY_PAN:if(u.enableZoom===false&&u.enablePan===false)return;F(e);h=m.TOUCH_DOLLY_PAN;break;case THREE.TOUCH.DOLLY_ROTATE:if(u.enableZoom===false&&u.enableRotate===false)return;Z(e);h=m.TOUCH_DOLLY_ROTATE;break;default:h=m.NONE}break;default:h=m.NONE}if(h!==m.NONE){u.dispatchEvent(n)}}function se(e){if(u.enabled===false)return;e.preventDefault();switch(h){case m.TOUCH_ROTATE:if(u.enableRotate===false)return;K(e);u.update();break;case m.TOUCH_PAN:if(u.enablePan===false)return;B(e);u.update();break;case m.TOUCH_DOLLY_PAN:if(u.enableZoom===false&&u.enablePan===false)return;W(e);u.update();break;case m.TOUCH_DOLLY_ROTATE:if(u.enableZoom===false&&u.enableRotate===false)return;q(e);u.update();break;default:h=m.NONE}}function ce(e){if(u.enabled===false)return;Q(e);u.dispatchEvent(a);h=m.NONE}function le(e){if(u.enabled===false)return;e.preventDefault()}u.domElement.addEventListener("contextmenu",le);u.domElement.addEventListener("pointerdown",J);u.domElement.addEventListener("wheel",oe);u.domElement.addEventListener("touchstart",ie);u.domElement.addEventListener("touchend",ce);u.domElement.addEventListener("touchmove",se);this.update()};THREE.OrbitControls.prototype=Object.create(THREE.EventDispatcher.prototype);THREE.OrbitControls.prototype.constructor=THREE.OrbitControls;THREE.MapControls=function(e,t){THREE.OrbitControls.call(this,e,t);this.screenSpacePanning=false;this.mouseButtons.LEFT=THREE.MOUSE.PAN;this.mouseButtons.RIGHT=THREE.MOUSE.ROTATE;this.touches.ONE=THREE.TOUCH.PAN;this.touches.TWO=THREE.TOUCH.DOLLY_ROTATE};THREE.MapControls.prototype=Object.create(THREE.EventDispatcher.prototype);THREE.MapControls.prototype.constructor=THREE.MapControls;