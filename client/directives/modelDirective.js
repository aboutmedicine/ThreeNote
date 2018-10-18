myApp.directive('three', function () {

    return {

        restrict: 'A',
        templateUrl: 'directives/modelDirective.html',
        link: function (scope, element, attrs) {

            // three.js

            let scene, camera, container, geometry, material, cube, loader, light, renderer, controls;

            scope.width = element[0].offsetWidth - element[0].offsetWidth / 20;
            scope.height = element[0].offsetHeight - element[0].offsetHeight / 20;
            container = angular.element('<div>')[0];
            element[0].appendChild(container);

            scope.init = function () {
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(75, scope.width / scope.height, .5, 4000);
                camera.position.x = 5;
                camera.position.y = 7.5;
                camera.position.z = 12.5;

                light = new THREE.AmbientLight(0xc0c0a0)
                scene.add(light);

                loader = new THREE.GLTFLoader();
                loader.load('meshes/gltf/Startup.glb', function (gltf) {
                    scene.add(gltf.scene);

                });

                renderer = new THREE.WebGLRenderer({
                    antialias: true
                });
                renderer.setSize(scope.width, scope.height);
                renderer.setClearColor(0xffffff, .5);
                container.appendChild(renderer.domElement);

                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.25;
                controls.screenSpacePanning = false;
                controls.maxDistance = 3000;
                controls.minDistance = 200;
            }

            scope.render = function () {
                renderer.render(scene, camera);
            }

            scope.animate = function () {
                requestAnimationFrame(scope.animate);
                controls.update();
                scope.render();
            };

            scope.init();
            scope.animate();

            // Other functions

            let noteMode = false;

            scope.noteMode = function () {
                if (noteMode === false) {
                    noteMode = true;
                } else {
                    noteMode = false;
                }
                scope.addNote();
                console.log(noteMode)
            };

            scope.toggleNote = function () {
                document.querySelector('.note').classList.toggle('open');
                document.querySelector('.notetitle').classList.toggle('visible');
                document.querySelector('textarea').classList.toggle('visible');
                document.querySelector('.close-button').classList.toggle('visible');
                document.querySelector('.ico.delete').classList.toggle('visible');
                document.querySelector('.ico.save').classList.toggle('visible');
                document.querySelector('.open-button').classList.toggle('invisible');
            }

        }
    }
});
