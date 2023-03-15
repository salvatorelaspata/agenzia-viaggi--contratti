import BaseLayout from '@/components/layout/BaseLayout'
import { Database } from '@/types/supabase'
import { Table, Text } from '@mantine/core'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
type expand = Database['public']['Tables']['contracts']['Row'][] & { contraente: { nome: string, cognome: string } }
interface ContractsProps {
    contracts: expand,
    count: number
}
const Contracts: React.FC<ContractsProps> = ({ contracts, count }) => {
    const router = useRouter()
    const column: { prop: 'operatore' | 'data_partenza' | 'data_arrivo' | 'partenza' | 'arrivo' | 'contraente.nome' | 'contraente.cognome', label: string }[] =
        [{ prop: 'operatore', label: 'Operatore' }, { prop: 'data_partenza', label: 'Data Partenza' }, { prop: 'data_arrivo', label: 'Data Arrivo' }, { prop: 'partenza', label: 'Da' }, { prop: 'arrivo', label: 'A' }, { prop: 'contraente.nome', label: 'Nome Contranete' }, { prop: 'contraente.cognome', label: 'Cognome Contraente' }]
    return (
        <BaseLayout title={`Contratti (${count})`}>
            <Link href="/contratti/new">
                Nuovo Contratto
            </Link>
            {contracts.length > 0 ? <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                        {column.map(({ label, prop }) => (
                            <th key={prop}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {contracts.map((contract: any) => (
                        <tr key={contract.id} onClick={() => router.push(`/contratti/${contract.id}`)}>
                            {column.map(({ prop }, i) => {
                                if (prop === 'contraente.nome' || prop === 'contraente.cognome')
                                    return <td key={`${i}_${prop}`}>{contract['contraente'][prop.split('.')[1]]}</td>
                                return <td key={`${i}_${prop}`}>{contract[prop]}</td>
                            })}
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
        .select('id, operatore, data_arrivo, data_partenza, partenza, arrivo, contraente(nome, cognome)', { count: 'exact' }) || { data: [], error: null, count: 0 }
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