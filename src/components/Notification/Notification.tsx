import React from 'react';

import { NotificationStatus } from '../../common/utils/notify';
import './styles.scss';

interface NotificationProps {
    message: string;
    title: string;
    status: NotificationStatus;
    onClose: any;
}
const Notification: React.FC<NotificationProps> = ({ message, title, status, onClose }) => {
    const getNotificationStatus = () => {
        const notificationStatus = {
            [NotificationStatus.SUCCESS]: {
                className: 'notification--success',
                icon: <i className="fa fa-check-circle" aria-hidden="true" />,
            },
            [NotificationStatus.INFO]: {
                className: 'notification--info',
                icon: <i className="fa fa-info-circle text-white" aria-hidden="true" />,
            },
            [NotificationStatus.WARNING]: {
                className: 'notification--warning',
                icon: <i className="fa fa-exclamation-triangle text-white" aria-hidden="true" />,
            },
            [NotificationStatus.ERROR]: {
                className: 'notification--error',
                icon: <i className="fa fa-exclamation-circle text-white" aria-hidden="true" />,
            },
        };
        return notificationStatus[status];
    };

    return (
        <div className={`notification ${getNotificationStatus().className}`}>
            <div className={'notification__icon'}>{getNotificationStatus().icon}</div>
            <div className={'notification__body'}>
                <div className={'notification__wrapper'}>
                    <span className={'notification__title'}> {title} </span>
                    <span className={'notification__content'}>{message}</span>
                </div>
                {onClose && <i className="fa fa-times notification__close" onClick={onClose} />}
            </div>
        </div>
    );
};

export default Notification;
