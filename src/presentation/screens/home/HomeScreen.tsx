/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {useAuthStore} from '../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const {logout} = useAuthStore();
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>LoginScreen</Text>
      <Icon name="facebook" />
      <Button accessoryLeft={<Icon name="log-out-outline" onPress={logout} />}>
        Cerrar Sesion
      </Button>
    </Layout>
  );
};
