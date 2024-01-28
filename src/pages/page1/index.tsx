import { ProfileForm } from '@/features/profileForm/components/ProfileForm';
import { Grid } from '@chakra-ui/react';
import { FC } from 'react';

const Page1: FC = () => {
  return (
    <Grid mt={100} w={'full'} placeItems={'center'}>
      <ProfileForm w={600} />
    </Grid>
  );
};

export default Page1;
