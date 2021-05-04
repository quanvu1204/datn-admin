import React from 'react';
import { cssTransition, toast, ToastOptions } from 'react-toastify';

import Notification from '../../components/Notification/Notification';

export enum NotificationStatus {
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
}

interface Notify {
    success: NotifyFunction;
    info: NotifyFunction;
    warning: NotifyFunction;
    error: NotifyFunction;
    dismiss: (toastId?: any) => void;
}

type NotifyFunction = (
    message: React.ReactNode | string,
    title: React.ReactNode | string,
    config?: ToastOptions,
) => void;

const Transition = cssTransition({
    enter: 'pullIn',
    exit: 'fadeOutRight',
    duration: [350, 300],
});

const toastOptions: ToastOptions = {
    hideProgressBar: true,
    autoClose: 3000,
    closeOnClick: false,
    closeButton: false,
    transition: Transition,
};

export const notify: Notify = {
    success: (message, title, options) => {
        showToast(message, title, options, NotificationStatus.SUCCESS);
    },
    info: (message, title, options) => {
        showToast(message, title, options, NotificationStatus.INFO);
    },
    warning: (message, title, options) => {
        showToast(message, title, options, NotificationStatus.WARNING);
    },
    error: (message, title, options) => {
        showToast(message, title, options, NotificationStatus.ERROR);
    },
    dismiss: (toastId?: any) => {
        toast.dismiss(toastId);
    },
};

const showToast = (message: any, title: any, options: ToastOptions = toastOptions, status: NotificationStatus) => {
    toast(
        ({ closeToast }) => <Notification message={message} title={title} status={status} onClose={closeToast} />,
        options,
    );
};
