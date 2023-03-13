import BaseLayout from "@/components/layout/BaseLayout";
import { Database } from "@/types/supabase";
import { Table } from "@mantine/core";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Catalogs: React.FC<{
    clienti: Database['public']['Tables']['contraente']['Row'][],
    count: number
}> = ({ clienti, count }) => {
    const router = useRouter()
    return (
        <BaseLayout title={`Clienti (${count})`}>
            <Link href="/clienti/new" className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded'>
                Creazione Cliente
            </Link>
            <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Data Nascita</th>
                        <th>Luogo Nascita</th>
                        <th>CF</th>
                        <th>Indirizzo</th>
                        <th>CAP</th>
                    </tr>
                </thead>
                <tbody>
                    {clienti.map((c) => (
                        <tr key={c.id} onClick={() => router.push(`/clienti/${c.id}`)}>
                            <td>{c.nome}</td>
                            <td>{c.cognome}</td>
                            <td>{c.data_nascita}</td>
                            <td>{c.luogo_nascita}</td>
                            <td>{c.cf}</td>
                            <td>{c.indirizzo}</td>
                            <td>{c.cap}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </BaseLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const supabase = createServerSupabaseClient<Database>(context)
    const { data, error, count } = await supabase
        .from('contraente')
        .select('*', { count: 'exact' })
    if (error) {
        return {
            props: {
                clienti: [],
                count: 0
            },
        }
    }
    return {
        props: {
            clienti: data,
            count
        },
    }
}

export default Catalogs;