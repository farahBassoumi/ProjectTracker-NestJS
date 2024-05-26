import { useState } from 'react';

// react-router-dom components
import { Link, useNavigate } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';

// Images
import curved6 from 'assets/images/curved-images/curved14.jpg';
import { AxiosInstance } from 'utils';

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleSubmit = async (e) => {
    try {
      const { data } = await AxiosInstance.post('/auth/register', formData);
      localStorage.setItem('auth', JSON.stringify(data));
      navigate('/projects');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        {/*<SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        */}

        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="username"
                placeholder="Username"
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: 'poiner', userSelect: 'none' }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                fullWidth
                onClick={handleSubmit}
              >
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
