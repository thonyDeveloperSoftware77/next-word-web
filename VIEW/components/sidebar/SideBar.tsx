
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@nextui-org/react';

export default function SideBar(routes: { routes: any }) {
    return (
        <Card style={{ height: "100vh" }}>
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">NextUI</p>
                    <p className="text-small text-default-500">nextui.org</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody >
                <nav>
                    <ul>
                        {
                            routes.routes.map((route: any, index: number) => (
                                <li key={index}>
                                    <Link href={route.path}>
                                        {route.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </CardBody>
            <Divider />
            <CardFooter>
            </CardFooter>
        </Card>
    );
}