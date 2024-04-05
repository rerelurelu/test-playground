import { Table, Td, Th } from "@/components/table";
import { tableData } from "@/mock/tableData";
import { Grid, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react";

export default function TablePage() {
	const data = tableData;
	return (
		<Grid placeItems={"center"} mt="200px">
			<TableContainer h="400px" overflowX={"scroll"} overflowY={"unset"}>
				<Table fontSize="sm" border="solid 1px orange">
					<Thead
						h="38px"
						position="sticky"
						zIndex="docked"
						top={0}
						boxShadow="0 -1px 0 blue"
					>
						<Tr bg="#E9E1EE">
							<Th>利用者名</Th>
							<Th>年齢</Th>
							<Th>契約プラン</Th>
						</Tr>
					</Thead>
					{data ? (
						<Tbody>
							{data.map((item, idx) => (
								<Tr key={`${item.name}-${idx}`}>
									<Td>{item.name}</Td>
									<Td>{item.age}</Td>
									<Td>{item.plan}</Td>
								</Tr>
							))}
						</Tbody>
					) : (
						<Tbody outline="solid 1px white" w="full">
							<Tr
								// borderTop="1px solid"
								// borderTopColor="red"
								boxShadow="0 -1px 0 red"
							>
								<Td>Ops!</Td>
							</Tr>
						</Tbody>
					)}
				</Table>
			</TableContainer>
		</Grid>
	);
}
