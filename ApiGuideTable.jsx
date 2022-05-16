import styles from './ApiGuideTable.module.scss';

export default function ApiGuideTable() {
    return (
        <table className={styles.apiGuideTable} cellSpacing={0} cellPadding={0}>
            <tbody><tr>
                <th>API contract name</th>
                <th>Category on website</th>
                <th>Name on website</th>
            </tr>
                <tr>
                    <td>MULTUP</td>
                    <td>Multiply Up/Multiply Down</td>
                    <td>Multiply Up</td>
                </tr>
                <tr>
                    <td>MULTDOWN</td>
                    <td>Multiply Up/Multiply Down</td>
                    <td>Multiply Down</td>
                </tr>
                <tr>
                    <td>UPORDOWN</td>
                    <td>Stays Between/Goes Outside</td>
                    <td>Goes Outside</td>
                </tr>
                <tr>
                    <td>EXPIRYRANGE</td>
                    <td>Ends Between/Ends Outside</td>
                    <td>Ends Between</td>
                </tr>
                <tr>
                    <td>ONETOUCH</td>
                    <td>Touch/No Touch</td>
                    <td>Touches</td>
                </tr>
                <tr>
                    <td>CALLE</td>
                    <td>Rise/Fall Equal</td>
                    <td>Higher</td>
                </tr>
                <tr>
                    <td>LBHIGHLOW</td>
                    <td>Lookbacks</td>
                    <td>High-Low</td>
                </tr>
                <tr>
                    <td>ASIAND</td>
                    <td>Asians</td>
                    <td>Asian Down</td>
                </tr>
                <tr>
                    <td>EXPIRYRANGEE</td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <td>DIGITDIFF</td>
                    <td>Digits</td>
                    <td>Digit Differs</td>
                </tr>
                <tr>
                    <td>DIGITMATCH</td>
                    <td>Digits</td>
                    <td>Digit Matches</td>
                </tr>
                <tr>
                    <td>DIGITOVER</td>
                    <td>Digits</td>
                    <td>Digit Over</td>
                </tr>
                <tr>
                    <td>PUTE</td>
                    <td>Rise/Fall Equal</td>
                    <td>Lower</td>
                </tr>
                <tr>
                    <td>DIGITUNDER</td>
                    <td>Digits</td>
                    <td>Digit Under</td>
                </tr>
                <tr>
                    <td>NOTOUCH</td>
                    <td>Touch/No Touch</td>
                    <td>Does Not touch</td>
                </tr>
                <tr>
                    <td>CALL</td>
                    <td>Up/Down</td>
                    <td>Higher</td>
                </tr>
                <tr>
                    <td>RANGE</td>
                    <td>Stays Between/Goes Outside</td>
                    <td>Stays Between</td>
                </tr>
                <tr>
                    <td>LBFLOATPUT</td>
                    <td>Lookbacks</td>
                    <td>High-Close</td>
                </tr>
                <tr>
                    <td>DIGITODD</td>
                    <td>Digits</td>
                    <td>Digit Odd</td>
                </tr>
                <tr>
                    <td>PUT</td>
                    <td>Up/Down</td>
                    <td>Lower</td>
                </tr>
                <tr>
                    <td>ASIANU</td>
                    <td>Asians</td>
                    <td>Asian Up</td>
                </tr>
                <tr>
                    <td>LBFLOATCALL</td>
                    <td>Lookbacks</td>
                    <td>Close-Low</td>
                </tr>
                <tr>
                    <td>EXPIRYMISSE</td>
                    <td />
                    <td />
                </tr>
                <tr>
                    <td>EXPIRYMISS</td>
                    <td>Ends Between/Ends Outside</td>
                    <td>Ends Outside</td>
                </tr>
                <tr>
                    <td>DIGITEVEN</td>
                    <td>Digits</td>
                    <td>Digit Even</td>
                </tr>
                <tr>
                    <td>TICKHIGH</td>
                    <td>highlowticks</td>
                    <td>High Tick</td>
                </tr>
                <tr>
                    <td>TICKLOW</td>
                    <td>highlowticks</td>
                    <td>Low Tick</td>
                </tr>
                <tr>
                    <td>RESETCALL</td>
                    <td>Reset Call/Reset Put</td>
                    <td>Reset Call</td>
                </tr>
                <tr>
                    <td>RESETPUT</td>
                    <td>Reset Call/Reset Put</td>
                    <td>Reset Put</td>
                </tr>
                <tr>
                    <td>CALLSPREAD</td>
                    <td>Call Spread/Put Spread</td>
                    <td>Call Spread</td>
                </tr>
                <tr>
                    <td>PUTSPREAD</td>
                    <td>Call Spread/Put Spread</td>
                    <td>Put Spread</td>
                </tr>
                <tr>
                    <td>RUNHIGH</td>
                    <td>Only Ups/Only Downs</td>
                    <td>Only Ups</td>
                </tr>
                <tr>
                    <td>RUNLOW</td>
                    <td>Only Ups/Only Downs</td>
                    <td>Only Downs</td>
                </tr>
            </tbody>
        </table>
    )
}
