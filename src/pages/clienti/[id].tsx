import BaseLayout from "@/components/layout/BaseLayout";
import { FormContraente } from "@/components/FormContraente";
import { createStyles, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Database } from "@/types/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));

interface ClienteProps {
  contraente: Database['public']['Tables']['contraente']['Row'];
  mode: 'view' | 'edit' | 'new';
}

const Cliente: React.FC<ClienteProps> = ({ contraente, mode }) => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      contraente
    }
  })

  return (
    <BaseLayout title={`Cliente N° ${contraente.id}`}>
      <FormContraente form={form} classes={classes} />
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query
  const supabase = createServerSupabaseClient<Database>(ctx)
  const { data } = await supabase.from('contraente').select().eq('id', id).single()
  console.log(data)
  if (!data) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      contraente: data
    }
  }
}

export default Cliente;