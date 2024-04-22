import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function CreateRoom() {
    const { data, setData, post, processing, errors, reset } = useForm()

    const submit = (e) => {
        e.preventDefault();

        post(route('room.store'));
    };

    return (
        <GuestLayout>
            <Head title="Movie Match" />

            <h2 onClick={submit}>Create Room</h2>

            <input type="text" />
        </GuestLayout>
    )
}
