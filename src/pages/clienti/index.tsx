import BaseLayout from "@/components/layout/BaseLayout";
import { Database } from "@/types/supabase";
import { Card, Flex, SimpleGrid, Table, Text } from "@mantine/core";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { IconUser } from "@tabler/icons-react";
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
            <Link href="/clienti/new">
                Creazione Cliente
            </Link>
            {/* <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cognome</th>
                    </tr>
                </thead>
                <tbody>
                    {clienti.map((c) => (
                        <tr key={c.id} onClick={() => router.push(`/clienti/${c.id}`)}>
                            <td>{c.nome}</td>
                            <td>{c.cognome}</td>
                        </tr>
                    ))}
                </tbody>
            </Table> */}
            <SimpleGrid cols={4} spacing="md" breakpoints={[
                { maxWidth: '62rem', cols: 3, spacing: 'md' },
                { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                { maxWidth: '36rem', cols: 1, spacing: 'sm' },
            ]}>
                {clienti.map(({ id, nome, cognome }) => (
                    <Card key={id}
                        shadow="sm"
                        padding="md"
                        component="a"
                        href={`/clienti/${id}`}>
                        <Flex align="center" justify="space-between">
                            <IconUser width={40} />
                            <Flex w={'100%'} direction={"column"} align="flex-start" justify="center" ml="md">
                                <Text weight={500} size="lg" >
                                    {nome}
                                </Text>
                                <Text size="sm" mt="sm">
                                    {cognome}
                                </Text>
                            </Flex>
                        </Flex>
                    </Card>
                ))}
            </SimpleGrid>
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