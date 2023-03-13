import BaseLayout from "@/components/layout/BaseLayout"
// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
// import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

const Contract: React.FC = () => {
  const { query: { id } } = useRouter()
  return (
    <BaseLayout title="Contratto">
      {id}
    </BaseLayout>
  )
}

export default Contract

// export const getServerSideProps: GetServerSideProps = async (context) => {}