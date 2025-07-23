import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
  Avatar,
  Card,
  CardBody,
} from "@heroui/react";
import { Invoice, InvoiceStatus } from "@/graphql/hooks";
import { Calendar } from "lucide-react";
import { CiCreditCard1 } from "react-icons/ci";
import { TbBrandStripeFilled } from "react-icons/tb";
import { IoMdCloudDownload } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

type TabInvoicesProps = {
  invoices: Invoice[];
};

export default function TabInvoices({ invoices }: TabInvoicesProps) {
  const columns = [
    { name: "Client", uid: "profile" },
    { name: "Montant", uid: "amount" },
    { name: "Date de paiement", uid: "paidAt" },
    { name: "Prochain paiement", uid: "nextPaymentAt" },
    { name: "Statut", uid: "status" },
    { name: "Actions", uid: "actions" },
  ];

  const renderStatus = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.Paid:
        return (
          <Chip color="success" variant="flat" size="sm" className="px-2">
            Payée
          </Chip>
        );
      case InvoiceStatus.Uncollectible:
        return (
          <Chip color="danger" variant="flat" size="sm" className="px-2">
            Impayée
          </Chip>
        );
      default:
        return (
          <Chip color="warning" variant="flat" size="sm" className="px-2">
            En attente
          </Chip>
        );
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      const date = parseISO(dateString);
      return format(date, "dd/MM/yyyy", { locale: fr });
    } catch (error) {
      console.error(error);
      return "-";
    }
  };

  return (
    <section className="w-full flex flex-col gap-2 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Facture(s)</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CiCreditCard1 className="w-6 h-6" />
          <span>
            {invoices.length} Facture{invoices.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>
      <Card className="shadow-sm border-t">
        <CardBody className="p-0">
          <Table
            aria-label="Table des factures"
            classNames={{
              wrapper: "shadow-sm",
              th: "bg-gray-50/50 text-gray-700 font-semibold",
              td: "py-4",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  className="bg-gray-50/50"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>

            {invoices.length ? (
              <TableBody items={invoices}>
                {(invoice) => (
                  <TableRow
                    key={invoice.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar
                          size="sm"
                          name={invoice.profileSubscription?.profile?.name}
                          className="text-yellow-400 bg-white"
                          fallback={<FaStar className="w-5 h-5" />}
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {invoice.profileSubscription?.profile?.name ||
                              "Client inconnu"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Facture #{invoice.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {formatAmount(invoice.amountPaid, invoice.currency)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {invoice.currency.toUpperCase()}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">
                          {formatDate(invoice.paidAt)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      {invoice.nextPaymentAt ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">
                            {formatDate(invoice.nextPaymentAt)}
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm text-dark">Annulé</p>
                      )}
                    </TableCell>

                    <TableCell>{renderStatus(invoice.status)}</TableCell>

                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Tooltip
                          content="Télécharger la facture PDF"
                          showArrow={true}
                          color="foreground"
                          className="text-xs"
                        >
                          <a
                            href={invoice.invoicePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          >
                            <IoMdCloudDownload className="w-4 h-4" />
                          </a>
                        </Tooltip>
                        {invoice.hostedInvoicePdf && (
                          <Tooltip
                            content="Voir les détails"
                            showArrow={true}
                            color="foreground"
                            className="text-xs"
                          >
                            <a
                              href={invoice.hostedInvoicePdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            >
                              <TbBrandStripeFilled className="w-4 h-4" />
                            </a>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            ) : (
              <TableBody
                emptyContent={
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <CiCreditCard1 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucune facture
                    </h3>
                    <p className="text-gray-500 text-center max-w-sm">
                      Tes factures apparaîtront ici une fois que tu auras
                      souscrit à un abonnement.
                    </p>
                  </div>
                }
              >
                {[]}
              </TableBody>
            )}
          </Table>
        </CardBody>
      </Card>
    </section>
  );
}
