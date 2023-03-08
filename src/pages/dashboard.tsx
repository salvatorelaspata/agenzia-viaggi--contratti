import BaseLayout from "@/components/layout/BaseLayout"
import { StatsRing } from "@/components/Stats";
import { Database } from "@/types/supabase";
import { Center, Text } from "@mantine/core";
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSideProps } from "next"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
    user: User
}
const Landing: React.FC = () => {
    return (
        <BaseLayout title="Dashboard">
            <Center><Text size="lg">Andamento anno corrente</Text></Center>
            <Center>
                <StatsRing data={[{
                    "label": "Page views",
                    "stats": "456,578",
                    "progress": 65,
                    "color": "teal",
                    "icon": "up"
                },
                {
                    "label": "New users",
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