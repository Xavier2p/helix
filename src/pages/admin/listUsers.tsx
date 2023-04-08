import { useEffect, useState } from 'react';
import { Table, ActionIcon, Flex, Title, Badge, Group, Button, Divider } from '@mantine/core';
import RoleBadge from '../../components/customBadges/userBadge';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import IdBadge from '../../components/customBadges/id';
import ModalAddUser from './create';
import axios from 'axios';
import { IUsers } from '../../interfaces';
import setNotification from '../system/errors/feedbackNotif';
import UserStatus from '../../components/customBadges/userStatus';

const ListUsers = (): JSX.Element => {
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);
    const [users, setUsers] = useState<IUsers[]>([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get('/api/users');
                setUsers(res.data);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchAllUsers();
    }, [show]);

    return (
        <>
            <Group position="apart">
                <Title order={2}>
                    Users{' '}
                    <Badge size="lg" radius="lg" variant="filled">
                        {users.length}
                    </Badge>
                </Title>
                <Button onClick={toggleModal}>New User</Button>
            </Group>
            <Divider my="lg" />
            <Table horizontalSpacing="md" verticalSpacing="md" highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        <th>UID</th>
                        <th>Account</th>
                        <th>State</th>
                        <th>Last Active</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.uid}>
                            <td>
                                <IdBadge id={user.uid ?? ''} />
                            </td>
                            <td>
                                {user.name} {user.lastName}
                            </td>
                            <td>
                                <UserStatus status={user.state} />
                            </td>
                            <td>{user.lastActive}</td>
                            <td>
                                <RoleBadge role={user.role} />
                            </td>
                            <td>
                                <Flex>
                                    <ActionIcon color="blue" variant="light" mx="xs" size="lg">
                                        <IconEye size="1rem" />
                                    </ActionIcon>
                                    <ActionIcon color="green" variant="light" mx="xs" size="lg">
                                        <IconEdit size="1rem" />
                                    </ActionIcon>
                                    <ActionIcon color="red" variant="light" mx="xs" size="lg">
                                        <IconTrash size="1rem" />
                                    </ActionIcon>
                                </Flex>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalAddUser show={show} toggleModal={toggleModal} />
        </>
    );
};

export default ListUsers;
