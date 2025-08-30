import { TalentListProvider } from "@/components/service-account-booking/context";

export default function Layout({children, ...props}){
  return (
    <TalentListProvider {...props}>
      {children}
    </TalentListProvider>
  );
}