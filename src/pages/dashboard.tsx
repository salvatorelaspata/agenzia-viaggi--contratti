import { ArticlesCardsGrid } from "@/components/Articles";
import BaseLayout from "@/components/layout/BaseLayout"
import { StatsRing } from "@/components/Stats";
import { Center, Text } from "@mantine/core";
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import { GetServerSideProps } from "next"

const Landing: React.FC = () => {
    return (
        <BaseLayout title="Dashboard">
            <Center mt={'lg'} mb={'lg'}><Text size="lg">Possibili grafici (Es Andamento anno corrente)</Text></Center>
            <Center>
                <StatsRing data={[{
                    "label": "Users",
                    "stats": "456,578",
                    "progress": 65,
                    "color": "teal",
                    "icon": "up"
                },
                {
                    "label": "Nuovi Contratti",
                    "stats": "2,550",
                    "progress": 72,
                    "color": "blue",
                    "icon": "up"
                },
                {
                    "label": "Orders",
                    "stats": "4,735",
                    "progress": 52,
                    "color": "red",
                    "icon": "down"
                }]} />
            </Center>
            <Center mt={'lg'} mb={'lg'}><Text size="lg">Possibili grafici (Es Andamento anno corrente)</Text></Center>
            <ArticlesCardsGrid />
        </BaseLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    debugger;
    const supabase = createServerSupabaseClient(ctx)
    const {
        data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            user: session?.user
        }
    }
}

export default Landing