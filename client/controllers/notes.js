var myApp = angular.module('myApp');

myApp.controller('NotesController', ['$scope', '$http', '$location', '$routeParams', '$document', function ($scope, $http, $location, $routeParams, $document) {
    console.log('NotesController loaded...');

    $scope.generateHtml = function (note, index) {
        return `
        <div class="note">
            <div ng-click="toggleNote()" class="open-button">+</div>
            <div ng-click="toggleNote()" class="close-button">&times;</div>
            <form ng-submit="updateNote()">
                <input class="notetitle" ng-model="note.title" placeholder="Note">
                <textarea ng-model="note.contents" rows="3" placeholder="Type Here..."></textarea>
                <a href="#" ng-click="removeNote(note._id)" class="ico delete"></a>
                <button type="submit" class="ico save"></button>
            </form>
        </div>
      `;
    }

    $scope.getNotes = function () {
        $http.get('/api/notes').success(function (response) {
            $scope.notes = response;
            let notesHtml = response.reduce((html, note, index) => html += $scope.generateHtml(note, index), '');
            document.getElementById('noteList').innerHTML = notesHtml;
        });
    }

    $scope.getNote = function () {
        var id = $routeParams.id;
        $http.get('/api/notes/' + id).success(function (response) {
            $scope.note = response;
        });
    }

    $scope.addNote = function () {
        $http.post('/api/notes/', $scope.note).success(function (response) {});
        console.log($scope.note);
    }

    $scope.updateNote = function () {
        var id = $routeParams.id;
        $http.put('/api/notes/' + id, $scope.note).success(function (response) {});
    }

    $scope.removeNote = function (id) {
        $http.delete('/api/notes/' + id).success(function (response) {});
    }

}]);
