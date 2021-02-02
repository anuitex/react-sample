//Vendors
import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import React, { useCallback } from "react";
import * as Yup from "yup";

//Models
import { RequestLoginModel } from "../models";

//Styles
import "./LoginFormComponent.scss";


interface LoginPageProps {
  value: RequestLoginModel;
  loading: boolean;
  onChange: (loginModel: RequestLoginModel) => void;
}

const loginValidationSchema = Yup.object<RequestLoginModel>({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

export function LoginFormComponent({ value, onChange, loading }: LoginPageProps): JSX.Element {

  const handleSubmit = useCallback((loginModel: RequestLoginModel) => {
    onChange(loginModel);
  }, [onChange]);

  return (
    <Formik
      initialValues={value}
      onSubmit={handleSubmit}
      validationSchema={loginValidationSchema}
    >
      <Form className="login">
        <Form.Item name="email" label="Email">
          <Input name="email"></Input>
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input name="password"></Input>
        </Form.Item>
        <Button
          type="primary"
          shape="round"
          htmlType="submit"
          disabled={loading}
          icon={<SendOutlined />}
          size="large"
        >
          Submit
        </Button>
      </Form>
    </Formik>
  );
}
