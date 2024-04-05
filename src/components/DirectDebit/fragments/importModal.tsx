import {
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/elements/Button";
import { CancelButton } from "./cancelButton";
import { CloseButton } from "./closeButton";
import { ImportForm } from "./importForm";
import { type FormData, schema } from "./schema";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: FormData) => void;
};

export const ImportModal: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
	const methods = useForm<FormData>({ resolver: yupResolver(schema) });
	const values = methods.watch(["file", "date"]);
	const isEntered = values.every((v) => !!v);

	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<ModalContent w="600px">
						<ModalHeader>
							<Flex justifyContent="space-between">
								<Text>入金結果ファイルを選択してください。</Text>
								<CloseButton onClick={onClose} />
							</Flex>
						</ModalHeader>
						<ModalBody>
							<Text mb="20px">
								振替された利用者の入金状況を「入金済」にします。
							</Text>
							<ImportForm />
						</ModalBody>
						<ModalFooter>
							<CancelButton onClick={onClose} />
							<Button
								type="submit"
								isDisabled={!isEntered}
								variant="primary"
								label="取込"
								ml={7}
							/>
						</ModalFooter>
					</ModalContent>
				</form>
			</FormProvider>
		</Modal>
	);
};
