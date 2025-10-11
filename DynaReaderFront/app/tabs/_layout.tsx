import { Drawer } from 'expo-router/drawer'
import CustomDrawerContent from '../../components/drawerContent'

export default function RootLayout() {
  return (
    <Drawer drawerContent={ CustomDrawerContent }>
        <Drawer.Screen
            name="HomeScreen"
            options={{
                headerShown: false,
                drawerLabel: "Home",
                drawerStyle: {
                    backgroundColor: '#F2F2F0',
                    width: 170
                },
                drawerLabelStyle: {
                    color: '#1E1E1E',
                    fontSize: 16
                }
            }}
        />
                <Drawer.Screen
            name="LoginScreen"
            options={{
                headerShown: false,
                swipeEnabled: false,
            }}
        />         
    </Drawer>
  );
}