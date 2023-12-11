import { Box, Container, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import House from './House';
import properties from '../../_mock/properties';
import CustomButton from './CustomButton';

const Properties = () => {
  const { t } = useTranslation();
  const PropertiesBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    backgroundColor: '#E6F0FF',
  }));

  const PropertyItem = styled(Box)(({ theme }) => ({
    backgroundColor: '#E6F0FF',
    width: '33%', // Sử dụng 33.33% để chiếm 1/3 của dòng
    marginBottom: theme.spacing(5), // Thêm khoảng cách giữa các hàng
    [theme.breakpoints.down('md')]: {
      width: '100%', // Đặt chiều rộng thành 100% để hiển thị 1 sản phẩm trên mỗi dòng trên màn hình nhỏ hơn
    },
  }));

  const PropertiesTextBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  }));

  const StyledBox = styled(Box)({
    marginTop: '40px',
    backgroundColor: '#E6F0FF', 
    padding: '80px 0'
  });

  const StyledTypography = styled(Typography)({
    color: '#0C4876', 
    fontSize: '35px', 
    fontWeight: 'bold'
  });

  const StyledSmallTypography = styled(Typography)({
    color: '#343A3F', 
    fontSize: '16px', 
    margin: '8px 0'
  });

  const StyledFlexBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (
    <StyledBox>
      <Container>
        <PropertiesTextBox>
          <StyledTypography>{t('feature')}</StyledTypography>
          <StyledSmallTypography>
          {t('text4')}
          </StyledSmallTypography>
        </PropertiesTextBox>

        <PropertiesBox>
          {properties.map((property) => (
            <PropertyItem key={property.id}>
              <House
                img={property.img}
                jobname={property.jobname}
                address={property.address}
                experience={property.experience}
                peoplerecruit={property.peoplerecruit}
                salary={property.salary}
              />
            </PropertyItem>
          ))}
        </PropertiesBox>
        <StyledFlexBox>
          <CustomButton backgroundColor="#0F1B4C" color="#fff" buttonText={t('seeMore')} guideBtn />
        </StyledFlexBox>
      </Container>
    </StyledBox>
  );
};

export default Properties;
