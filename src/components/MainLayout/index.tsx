import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import type { FC, ReactNode } from "react";

type Props = {
	officeId: string;
	children: ReactNode;
	currentPage: string;
	form?: {
		isEditing?: boolean;
		isValid?: boolean;
		onSubmit?: () => Promise<void>;
	};
};

export const MainLayout: FC<Props> = ({ children, currentPage }) => {
	return (
		<Flex minHeight="100vh" direction="column">
			<Head>
				<title>{`レセプト ${currentPage}`}</title>
				<meta name="referrer" content="no-referrer-when-downgrade" />
			</Head>

			<main style={{ flex: 1 }}>{children}</main>
		</Flex>
	);
};
