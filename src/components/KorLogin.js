import React from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

class KorLogin extends React.Component {
    state = {
        success: false,
        id: null,
    };

    render() {
        return (
            <>
                <form
                    className="inputForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const LS_signUp = JSON.parse(
                            localStorage.getItem('signUp'),
                        );
                        if (LS_signUp) {
                            const idFilter = LS_signUp.filter(
                                (account) => account.id === e.target.id.value,
                            );
                            const pwFilter = LS_signUp.filter(
                                (account) => account.pw === e.target.pw.value,
                            );
                            if (
                                idFilter.length !== 0 &&
                                idFilter[0].pw === e.target.pw.value
                            ) {
                                alert('로그인 완료~!~!~~!~!~!~!~!');
                                this.setState({ id: e.target.id.value });
                                this.setState({ success: true });
                            } else if (
                                pwFilter.length !== 0 &&
                                idFilter.length === 0 &&
                                pwFilter[0].pw === e.target.pw.value
                            ) {
                                alert('아이디가 일치하지 않습니다.');
                            } else if (
                                idFilter.length !== 0 &&
                                idFilter[0].pw !== e.target.pw.value
                            ) {
                                alert('비밀번호가 일치하지 않습니다.');
                            } else {
                                alert('아이디와 비밀번호가 일치하지 않습니다.');
                            }
                        } else {
                            alert('회원가입 가입 해라~ 알았나?');
                        }
                    }}
                >
                    <input
                        name="id"
                        type="text"
                        className="input"
                        placeholder="아이디"
                    />
                    <input
                        name="pw"
                        type="password"
                        className="input"
                        placeholder="비밀번호"
                    />
                    <input type="submit" className="loginBtn" value="로그인" />
                    <label htmlFor="" className="loginState">
                        <input type="checkbox" name="로그인 상태 유지" id="" />
                        로그인 상태 유지
                    </label>
                    <label htmlFor="" className="ipSecurity">
                        IP 보안
                        <input type="checkbox" name="IP보안" id="" />
                    </label>
                </form>
                {this.state.success ? <LoginModal id={this.state.id} /> : null}
                <hr className="line" />
                <h2 className="easyLogin">더욱 간편한 로그인</h2>
                <div className="easyWay">
                    <ul className="easyWayBtns">
                        <li className="qrCode">
                            <Link to="/login/korqr">QR코드 로그인</Link>
                        </li>
                        <li className="disposable">
                            <Link to="/login/kordisposable">
                                일회용 번호 로그인
                            </Link>
                        </li>
                    </ul>
                    <ul className="findAccount">
                        <li>
                            <a href="/">아이디 찾기</a>
                        </li>
                        <li>
                            <a href="/">비밀번호 찾기</a>
                        </li>
                        <li>
                            <Link to="/login/signup">회원가입</Link>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}

export default KorLogin;
