import { SlClose , SlEye, SlArrowRight, SlArrowLeft, SlArrowUp, SlArrowDown, SlPeople, SlEarphonesAlt, SlChart, SlPhone, SlWrench } from "react-icons/sl"

import { IconProps, IKind } from "."

function IconUi({ type }: { type: IKind }): JSX.Element {
    switch (type) {
        case 'row-right':
            return <SlArrowRight />
        case 'row-left':
            return <SlArrowLeft />
        case 'row-up':
            return <SlArrowUp />
        case 'row-down':
            return <SlArrowDown />
        case 'people':
            return <SlPeople />
        case 'ear-phones-alt':
            return <SlEarphonesAlt />
        case 'chart':
            return <SlChart />
        case 'phone':
            return <SlPhone />
        case 'wrench':
            return <SlWrench />
        case 'sl-eye':
            return <SlEye  />
        case 'sl-close':
            return <SlClose  />
    }
}

export default function Icon({ className, type, onClick }: IconProps) {
    return (
        <div className={className} onClick={onClick}>
            <IconUi type={type} />
        </div>
    )

}
