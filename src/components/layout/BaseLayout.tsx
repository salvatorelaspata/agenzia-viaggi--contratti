import { Constants } from '@/constants';
import { Container, Text } from '@mantine/core';
import { useUser } from '@supabase/auth-helpers-react';
import { HeaderResponsive } from './Header';


const BaseLayout: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    const user = useUser();

    return (
        <div className="App">
            {/* <Header /> */}
            {user && <HeaderResponsive links={Constants.privateRoutes} user={user} />}
            <main>
                <Container fluid maw={'1024px'}> {/* fluid={true} */}
                    <Text size={'xl'}>{title}</Text>
                    {children}
                </Container>
            </main>
            {/* <Footer /> */}
        </div>
    )
}

export default BaseLayout;