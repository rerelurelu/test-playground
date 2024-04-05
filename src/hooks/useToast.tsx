import { Toast } from "@/components/elements/Toast";
import { useToast as ChakraToast } from "@chakra-ui/react";

export const useToast = () => {
	const toast = ChakraToast();

	return (message: string | string[], duration = 1000) => {
		return toast({
			position: "top",
			containerStyle: { maxWidth: "100%", width: "100%", margin: 0 },
			duration,
			render: () => <Toast message={message} />,
		});
	};
};
