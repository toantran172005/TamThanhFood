import React from 'react'
import Header_2 from '../components/Header_2'
import { Link } from 'react-router-dom'
import '../css/Setting.css'

function Setting() {
  return (
    <div className='setting'>
        <div className="setting_content">
            <Header_2></Header_2>
            <div className="setting_header">
                <div className="back">
                <Link to="/">
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Quay lại</span>
                </Link>
                </div>

                <div className="title">
                <p>THIẾT LẬP</p>
                </div>
            </div>

            <div className="setting_body">
                <div className="information_account">
                    <p>Tài Khoản</p>
                    <ul>
                        <li>Tài khoản & Bảo mật <a href="" ><span className='setting_content_arrow'>&gt;</span></a></li>
                        <li>Địa chỉ <a href=""><span className='setting_content_arrow'>&gt;</span></a></li>
                        <li>Tài khoản / Thẻ ngân hàng <a href=""><span className='setting_content_arrow'>&gt;</span></a></li>
                    </ul>
                </div>

                <div className="general">
                    <p>Cài đặt</p>
                    <ul>
                        <li>Cài đặt Chat <a href=""><span className='setting_content_arrow'>&gt;</span></a></li>
                        <li>Cài đặt Thông báo <a href=""><span className='setting_content_arrow'>&gt;</span></a></li>
                        <li>Cài đặt Riêng tư <a href=""><span className='setting_content_arrow'>&gt;</span></a></li>
                        <li style={{position: "relative"}}>Ngôn ngữ <span className='language'>(Tiếng Việt)</span> <a href=""><span className='setting_content_arrow'>&gt;</span></a></li>
                        <li style={{position: "relative"}}>Màu nền <span className='mode'>(Sáng)</span> <a href=""><span className='setting_content_arrow'>&gt;</span></a></li>
                    </ul>
                </div>

                <div className='support'>
                    <p>Hỗ trợ</p>
                    <ul>
                        <li>Trung tâm hỗ trợ <a href=""><span className='setting_content_arrow'>&gt;</span></a></li>
                        <li>Điều khoản <a href=""><span className='setting_content_arrow'>&gt;</span></a></li>
                        <li>Giới thiệu <a href=""><span className='setting_content_arrow'>&gt;</span></a></li>
                    </ul>
                </div>


            </div>
            
        </div>
    </div>
  )
}

export default Setting