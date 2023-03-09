import BaseLayout from "@/components/layout/BaseLayout";
import { Database } from "@/types/supabase";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Catalogs: React.FC<{
    catalogs: Database['public']['Tables']['contraente']['Row'][],
    count: number
}> = ({ catalogs, count }) => {
    const router = useRouter()
    return (
        <BaseLayout title={`Clienti (${count})`}>
            <Link href="/clienti/new" className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded'>
                Creazione Contraente
            </Link>
        </BaseLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const supabase = createServerSupabaseClient<Database>(context)
    const { data, error, count } = await supabase
        .from('Catalog')
        .select('*', { count: 'exact' })
    if (error) {
        return {
            props: {
                catalogs: [],
                count: 0
            },
        }
    }
    return {
        props: {
            catalogs: data,
            count
        },
    }
}

export default Catalogs;