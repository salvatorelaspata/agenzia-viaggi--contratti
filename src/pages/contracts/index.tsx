import BaseLayout from '@/components/layout/BaseLayout'
import Table from '@/components/Table'
import { Database } from '@/types/supabase'
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
        <BaseLayout title={`Project (${count})`}>
            <Link href="/contracts/new" className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded'>
                New Project
            </Link>
            <Table data={contracts} onRowClick={
                (row: Database['public']['Tables']['contracts']['Row']) => {
                    router.push(`/contracts/${row.id}`)
                }
            } />
        </BaseLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const supabase = createServerSupabaseClient<Database>(context)
    const { data: contracts, error, count } = await supabase
        .from('contracts')
        .select('*', { count: 'exact' })
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