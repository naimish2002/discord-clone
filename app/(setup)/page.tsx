import { InitialModel } from "@/components/modals/InitialModel";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
    const profile = await initialProfile();

    // Check if the user is already in a server
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if(server) {
        return redirect(`/server/${server.id}`);
    }
    return ( 
        <InitialModel />
     );
}
 
export default SetupPage;