import { useLocation } from 'react-router-dom';
import AddressList from '../../../../components/AddressUrlStack/Index';
import { Tab, Tabs } from '../../../../components/TabComponent';
import { Outlet } from 'react-router-dom';

const ClassroomInfomation = () => {
    const location = useLocation(); 

    const addressList = [
        { link: '', linkName: 'Thông tin lớp học' },
        { link: '', linkName: 'Toán đại số' },
        { link: '', linkName: 'Hỏi đáp' },
    ];

    return (
        <section className="mr-3 md:py-1 antialiased">
            <div>
                <AddressList addressList={addressList} />
            </div>
            <div className="grid grid-cols-1 pr-4 xl:gap-4">
                <div className="col-span-full xl:col-auto">
                    <Tabs aria-label="Options" radius="xl" color="primary" variant="solid" size="lg">
                        <Tab
                            tabKey="classroominfomation"
                            title="Thông tin lớp học"
                            path="history"
                            radius="xl"
                            color={location.pathname.includes('/teacher/classroom-information/history') ? 'white' : 'default'}
                            size="sm"
                            variant={location.pathname.includes('/teacher/classroom-information/history') ? 'charcoal' : 'light'}
                            children={undefined}
                        />
                        <Tab
                            tabKey="QA"
                            title="Hỏi đáp Q & A"
                            path="qa"
                            radius="xl"
                            color={location.pathname.includes('/teacher/classroom-information/qa') ? 'white' : 'default'}
                            size="sm"
                            tag={5}
                            variant={location.pathname.includes('/teacher/classroom-information/qa') ? 'charcoal' : 'light'}
                            children={undefined}
                        />
                    </Tabs>
                </div>
            </div>

            <Outlet />
        </section>
    );
};

export default ClassroomInfomation;
