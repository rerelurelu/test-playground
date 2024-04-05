import { ProfileForm } from "@/features/profileForm/components/ProfileForm";
import { Grid } from "@chakra-ui/react";

export default function FormPage() {
	return (
		<Grid mt={100} w={"full"} placeItems={"center"}>
			<ProfileForm w={600} />
		</Grid>
	);
}
