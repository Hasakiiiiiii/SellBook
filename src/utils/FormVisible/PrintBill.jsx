import React from "react";

import "./FormVisibleAll.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const PrintBill = ({ listOrder, onClose, onApply }) => {
    const getListOrder = () => {
        const rows = [];

        for (let i = 0; i < 5; i++) {
            rows.push(
                <div>
                    <p style={{ width: "55%", textAlign: "left", marginLeft: '7px' }}>
                        Hướng dẫn trade coin cho người mới
                    </p>
                    <p style={{ width: "17%", textAlign: "center" }}>2</p>
                    <p style={{ width: "28%", textAlign: "center" }}>1.000.000đ</p>
                </div>
            );
        }

        return rows;
    };

    return (
        <div className="bg_black">
            <div className="print-bill">
                <div className="print-bill_header">
                    <img src="/images/logoBooker.png" alt="booker-logo" />
                    <p>Booker</p>
                </div>

                <p className="print-bill_ship">Giao hàng hỏa tốc</p>

                <div className="print-bill_people">
                    <p>
                        Người gửi: <span>Sunrise2.vn</span>
                    </p>
                    <p>
                        số 1 đường b21 khu dân cư 91b, phường An Khánh, quận Ninh Kiều, Cần
                        Thơ{" "}
                    </p>
                </div>

                <div className="print-bill_people">
                    <p>
                        Người nhận: <span>Thánh Boom Hàng</span>
                    </p>
                    <strong>0972376536</strong>
                    <p>
                        184/5 hẽm 470 Tô Ký, phường Tân Chánh Hiệp, Tô Ký, quận 12, TP Hồ
                        Chí Minh
                    </p>
                </div>

                <p className="print-bill_mess">Shop giao hàng nhanh giúp em nhe:::</p>

                <div className="print-bill_info">
                    <h4>Mã đơn hàng: 201</h4>
                    <h4>Ngày đặt hàng: 20h13m8s 22/9/2024</h4>

                    <div className="print-bill_info--title">
                        <div>
                            <p style={{ width: "55%", textAlign: "left", marginLeft: '7px' }}>Sản phẩm</p>
                            <p style={{ width: "17%", textAlign: "center" }}>Số lượng</p>
                            <p style={{ width: "28%", textAlign: "center" }}>Giá</p>
                        </div>
                        <div>{getListOrder()}</div>
                    </div>

                    <div className="print-bill_total">
                        <div className="print-bill_total--title">
                            <h3>Phí vận chuyển: </h3>
                            <h3>Giảm giá: </h3>
                            <h3>Thanh toán:</h3>
                        </div>
                        <div className="print-bill_total--price">
                            <h3>10.000đ</h3>
                            <h3>10.000đ</h3>
                            <h3>320.000đ</h3>
                        </div>
                    </div>
                </div>

                <p className="tks">Cảm ơn bạn đã mua hàng, bạn đánh giá 5sao cho shop nhé</p>

                <div className="print-bill_btn">
                    <button onClick={onClose}>
                        <span style={{marginRight: '14px'}}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </span>
                        Thoát
                    </button>
                    <button onClick={onApply}>
                        <span style={{marginRight: '14px'}}>
                            <FontAwesomeIcon icon={faPrint} />
                        </span>
                        In hóa đơn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrintBill;
