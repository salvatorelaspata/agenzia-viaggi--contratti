import BaseLayout from '@/components/layout/BaseLayout'
import { Database } from '@/types/supabase'
import { Table, Text } from '@mantine/core'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
interface ContractsProps {
    contracts: Database['public']['Tables']['contracts']['Row'][],
    count: number
}
const Contracts: React.FC<ContractsProps> = ({ contracts, count }) => {
    const router = useRouter()

    return (
        <BaseLayout title={`Contratti (${count})`}>
            <Link href="/contratti/new">
                Nuovo Contratto
            </Link>
            {contracts.length > 0 ? <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                        {Object.keys(contracts[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {contracts.map((contract) => (
                        <tr key={contract.id} onClick={() => router.push(`/clienti/${contract.id}`)}>
                            {Object.values(contract).map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table> : <Text size={'sm'}>Nessun contratto trovato</Text>}
        </BaseLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const supabase = createServerSupabaseClient<Database>(context)
    const { data: contracts, error, count } = await supabase
        .from('contracts')
        .select('*', { count: 'exact' }) || { data: [], error: null, count: 0 }
    if (error) {
        return {
            props: {
                contracts: [],
                count: 0
            },
        }
    }
    return {
        props: {
            contracts,
            count
        },
    }
}
export default Contracts