function validChk() {
    if(document.getElementsByName('member_id')[0].value.length < 6 ){
        document.getElementsByName('member_id')[0].focus()
        document.querySelector('.idMsg').innerText = "아이디를 제대로 입력 하셔야 합니다."
        return false;
    }
    
    if(document.querySelector('.idMsg').innerText == "\"중복된 아이디 입니다.\""){
        document.getElementsByName('member_id')[0].focus()
        document.querySelector('.idMsg').innerText = "중복된 아이디 입니다."
        return false;
    }

    if(document.getElementsByName('member_pw')[0].value.length < 7) {
        document.getElementsByName('member_pw')[0].focus()
        document.querySelector('.pwMsg1').innerText = "비밀번호를 제대로 입력 하셔야 합니다."
        return false;
    }

    if(document.getElementsByName('confirm')[0].value.length == 0) {
        document.getElementsByName('confirm')[0].focus()
        document.querySelector('.pwMsg2').innerText = "비밀번호 확인을 해주셔야 합니다."
        return false;
    }

    if(confirm_state == 1) {
        document.getElementsByName('confirm')[0].focus()
        document.querySelector('.pwMsg2').innerText = "비밀번호가 일치하지 않습니다."
        return false;
    }

    if(document.getElementsByName('member_name')[0].value.length == 0 ) {
        document.getElementsByName('member_name')[0].focus()
        document.querySelector('.nameMsg').innerText = "이름을 입력해야 합니다."
        return false;
    }

    if(document.getElementsByName('member_name')[0].value.length == 1 ) {
        document.getElementsByName('member_name')[0].focus()
        document.querySelector('.nameMsg').innerText = "이름을 제대로 입력해야 합니다."
        return false;
    }

    if(
        document.getElementsByName('member_address1')[0].value.length < 1 || 
        document.getElementsByName('member_address2')[0].value.length < 1 || 
        document.getElementsByName('member_address3')[0].value.length < 1 ) {
        document.getElementsByName('member_address1')[0].focus()
        document.querySelector('.addressMsg').innerText = "주소를 입력해야 합니다."
        return false;
    }

    if(
        document.getElementsByName('member_phone2')[0].value.length == 0 || 
        document.getElementsByName('member_phone3')[0].value.length == 0 ) {    
        document.querySelector('.phoneMsg').focus()
        document.querySelector('.phoneMsg').innerText = "번호를 입력 해주세요."
        return false;
    }

    if( document.getElementsByName('member_phone2')[0].value.length < 3 ) {
        document.getElementsByName('member_phone2')[0].focus()
        document.querySelector('.phoneMsg').innerText = "번호를 제대로 입력 해주세요."
        return false;
    }

    if( document.getElementsByName('member_phone3')[0].value.length < 3 ) {
        document.getElementsByName('member_phone3')[0].focus()
        document.querySelector('.phoneMsg').innerText = "번호를 제대로 입력 해주세요."
        return false;
    }

    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    if(document.getElementsByName('member_email')[0].value.match(regExp) == null) {
        document.getElementsByName('member_email')[0].focus()
        document.querySelector('.emailMsg').innerHTML = "이메일 형식에 맞춰서 입력해야 합니다."
        return false;
    }
}