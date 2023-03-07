import { useUser } from '@supabase/auth-helpers-react';
import { HeaderTabs } from './HeaderWithTabs';

const BaseLayout: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    const user = useUser();

    return (
        <div className="App">
            {/* <Header /> */}
            {user && <HeaderTabs tabs={['Contracts', 'Projects', 'Invoices', 'Settings']} user={user} />}
            <main>
                <h1 className='px-4'><span className='text-gradient'>{title}</span></h1>
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )
}

export default BaseLayout;