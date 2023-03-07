import { Footer } from './Footer';
import { Header } from './Header';
import { HeaderTabs } from './HeaderWithTabs';

const BaseLayout: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    return (
        <div className="App">
            {/* <Header /> */}
            <HeaderTabs tabs={['Contracts', 'Projects', 'Invoices', 'Settings']} user={{ name: 'John Doe', image: 'https://avatars.githubusercontent.com/u/1443320?v=4' }} />
            <main>
                <h1 className='px-4'><span className='text-gradient'>{title}</span></h1>
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )
}

export default BaseLayout;