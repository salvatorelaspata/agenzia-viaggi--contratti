import BaseLayout from '@/components/layout/BaseLayout'
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props {
    user: User
}
const Home: React.FC<Props> = ({ user }) => {
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    useEffect(() => {
        supabaseClient.auth.onAuthStateChange((event, session) => {
            console.log(event, session)
            router.push('/dashboard')
        })
    }, [router, supabaseClient.auth])
    return (
        <BaseLayout title="">
            <div className='p-10'>
                <Auth
                    redirectTo="https://vgxdfwlocieswvxiudsl.supabase.co/auth/v1/callback"
                    appearance={{ theme: ThemeSupa }}
                    supabaseClient={supabaseClient}
                    providers={['google']}
                    socialLayout="horizontal"
                />
            </div>
        </BaseLayout>

    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx)
    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session)
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    return {
        props: {
            user: null
        }
    }
}

export default Home