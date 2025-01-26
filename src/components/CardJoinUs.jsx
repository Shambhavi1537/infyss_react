import { Button, Col, Form, Grid, Input, Row, message } from "antd";
import backgroundJoinUs from "../assets/images/bg2.jpg";
import backgroundJoinUsMobile from "../assets/images/bg2.jpg";
import { useEffect } from "react";

const CardJoinUs = (props) => {
  const { xs } = Grid.useBreakpoint();
  const backgroundImage = xs ? backgroundJoinUsMobile : backgroundJoinUs;

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const validateMessages = {
    required: "Silahkan masukkan ${label} anda  ",
    types: {
      email: "Format ${label} tidak sesuai",
    },
    string: {
      max: "${label} tidak boleh lebih dari 13 digit",
    },
  };

  const kodeReferral = props;
  useEffect(() => {
    if (kodeReferral.kodeReferral !== undefined) {
      form.setFieldsValue({
        Kode_Referral: `${kodeReferral.kodeReferral}`,
      });
    }
  }, []);

  const onFinish = (val) => {
    const phoneNumber = val.No_Handphone.substring(0, 4) + "-" + val.No_Handphone.substring(4, 8) + "-" + val.No_Handphone.substring(8, val.No_Handphone.length);
    const tanggalRegistrasi = new Date();

    try {
      fetch("https://sheetdb.io/api/v1/b97ftmjkho2ja", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              Nama: val.name,
              Email: val.email,
              No_Handphone: phoneNumber,
              Kode_Referral: val.Kode_Referral,
              Tanggal_Registrasi: tanggalRegistrasi.getDate() + "-" + (tanggalRegistrasi.getMonth() + 1) + "-" + tanggalRegistrasi.getFullYear(),
            },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.created !== undefined) {
            form.resetFields();
            messageApi.open({
              type: "success",
              content: <span className="message-registrasi">Sucessful</span>,
              className: "custom-class",
            });
          } else {
            console.log("Registrasi Gagal");
            messageApi.open({
              type: "error",
              content: <span className="message-registrasi">Sorry try again</span>,
              className: "custom-class",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="join-us"
      style={{
        paddingTop: 50,
        backgroundPosition: "center",
        backgroundImage: `url(${backgroundImage})`,
        // backgroundImage: {contactusimg},
        backgroundColor: '#8ca2ba',
        // backgroundSize: "cover",
      }}
    >
      <Row justify={"center"}>
        <Col xs={22} sm={22} md={18} lg={12} xl={12}>
          <h2 className="join-us-title">
          Let’s Work Together
          </h2>
        </Col>
      </Row>
      <Row className="form-join-us" justify={"center"}>
        <Col xs={20} sm={20} md={16} lg={14} xl={13}>
          {contextHolder}
          <Form form={form} name="join-us" layout="vertical" validateMessages={validateMessages} onFinish={(e) => onFinish(e)}>
            <Form.Item
              className="form-item"
              name="name"
              required
              label="Name"
              labelStyle={{ color: "#2e40b6" }}
              rules={[
                {
                  required: true,
                  message: "Please enter your name", 
                },
              ]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
            <Form.Item
              className="form-item"
              name="email"
              required
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email", 
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              className="form-item"
              name="No_Handphone"
              required
              label="Contact number"
              rules={[
                {
                  required: true,
                  message: "Please enter your contact number", 
                },
                {
                  max: 13,
                  message: "Contact number cannot exceed 13 characters", 
                },
              ]}
            >
              <Input type="number" placeholder="Enter contact number" />
            </Form.Item>
            {/* <Form.Item
              className="form-item"
              name="Kode_Referral"
              label="Kode Referral"
              tooltip={{
                icon: <span style={{ fontSize: 12, marginLeft: 10, color: "#e0dede" }}>(Optional)</span>,
              }}
            >
              <Input placeholder="Masukkan kode referral" disabled={kodeReferral.kodeReferral && true} />
            </Form.Item> */}
            <Form.Item className="button-item">
              <Button className="button-submit" htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CardJoinUs;
