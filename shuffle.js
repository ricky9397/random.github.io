$(document).ready(function() {
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    let teams = [];
    let currentTeamIndex = 0;

    function updateNameCount() {
        const nameCount = $('#nameList').children().length;
        $('#nameCount').text(`총 인원 : ${nameCount}`);
    }

    $('#addNameButton').button().click(function() {
        const name = $('#nameInput').val();
        if (name) {
            $('#nameList').append(`<li>${name}</li>`);
            $('#nameInput').val('');
            updateNameCount();
        }
    });

    $('#nameInput').keypress(function(key){
        if(key.keyCode == 13) {
            const name = $('#nameInput').val();
            if (name) {
                $('#nameList').append(`<li>${name}</li>`);
                $('#nameInput').val('');
                updateNameCount();
            }
        }
    });

    // 이름 삭제
    $('#removeNameButton').click(function() { // 추가된 부분
        $('#nameList li:last-child').remove();
        updateNameCount();
    });

    // 팀원 삭제
    $('#removeMemberButton').click(function() { // 추가된 부분
        $('#teamContainer').children().last().remove(); // 팀원 삭제

        // 팀 제목 삭제
        const teamElements = $('#teamContainer').children();
        if (teamElements.length > 0) {
            const lastTeamIndex = teamElements.length - 1;
            const lastTeamElement = $(teamElements[lastTeamIndex]);
            if (lastTeamElement.children('ul').children().length === 0) {
                lastTeamElement.remove(); // 마지막 팀에 팀원이 없으면 팀 제목도 삭제
            }
        }
    });

    $('#generateTeamsButton').button().click(function() {
        const $nameItems = $('#nameList').children();
        const namesArray = $.makeArray($nameItems.map(function() {
            return $(this).text();
        }));

        const teamCount = parseInt($('#teamCountInput').val());
        if (isNaN(teamCount) || teamCount < 1) {
            alert('올바른 조 개수를 입력하세요.');
            return;
        }

        // 팀을 처음 생성하는 경우
        if (teams.length === 0) {
            teams = [];
            currentTeamIndex = 0;
            for (let i = 0; i < teamCount; i++) {
                teams.push([]);
            }
            shuffle(namesArray);
            for (let i = 0; i < namesArray.length; i++) {
                teams[i % teamCount].push(namesArray[i]);
            }
        }

        // 현재 팀 인덱스가 팀 배열 길이보다 작을 때만 팀을 추가
        if (currentTeamIndex < teams.length) {
            const teamHTML = `<h2>팀 ${currentTeamIndex + 1}</h2><ul>${teams[currentTeamIndex].map(name => `<li>${name}</li>`).join('')}</ul>`;
            $('#teamContainer').append(teamHTML);
            currentTeamIndex++;

            // 모든 팀이 생성된 후 버튼 비활성화
            if (currentTeamIndex === teams.length) {
                $('#generateTeamsButton').prop('disabled', true);
            }
        } else {
            alert('모든 조가 이미 생성되었습니다.');
        }
    });

    $('#resetNameButton').click(function() {
        $('#nameList').empty();
        $('#nameInput').val('');
    });

    $('#resetTeamsButton').click(function() {
        $('#teamContainer').empty();
        teams = [];
        currentTeamIndex = 0;
        $('#generateTeamsButton').prop('disabled', false);
    });

    $('#resetAllButton').click(function() {
        $('#nameList').empty();
        $('#teamContainer').empty();
        $('#nameInput').val('');
        $('#teamCountInput').val('');
        teams = [];
        currentTeamIndex = 0;
        $('#generateTeamsButton').prop('disabled', false);
    });

});
