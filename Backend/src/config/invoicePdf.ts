import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Order } from "../models/orders.model";
import { Category } from "../models/categories.model";
import { imageUrlToBase64 } from "../utils/stampDownloader";

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
  },
};

const printer = new PdfPrinter(fonts);

const formatDate = (date: Date | string) => {
  const d = new Date(date);

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const numberToWords = (num: number): string => {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const inWords = (n: number): string => {
    if (n === 0) return "Zero";
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " " + inWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + inWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 ? " " + inWords(n % 100000) : "")
      );
    return (
      inWords(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 ? " " + inWords(n % 10000000) : "")
    );
  };

  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);

  let result = "";
  if (rupees > 0) {
    result += `${inWords(rupees)} Rupees`;
  } else {
    result += "Zero Rupees";
  }

  if (paise > 0) {
    result += ` and ${inWords(paise)} Paise`;
  }

  return result;
};

const formatAmount = (n: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

export const generateInvoicePdf = async (data: Order) => {
  const stampBase64 = await imageUrlToBase64(
    "https://res.cloudinary.com/drkzz6pfx/image/upload/v1767875831/stamp_mz7sv9.png"
  );

  const gstRate = 0.18;
  const itemRows: any[] = [];

  if (data.order_items) {
    const item = data.order_items;

    const taxableValue = item.price * item.quantity;
    const gst = Math.round(taxableValue * gstRate);
    const cgstAmount = Math.round(gst / 2);
    const sgstAmount = Math.round(gst / 2);

    // ================= PRODUCT ROW =================
    itemRows.push([
      {
        text: `${item.name} - ${(item.categoryId as Category).name}`,
        alignment: "left",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
      {
        text: item.quantity.toString(),
        alignment: "center",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
      {
        text: formatAmount(taxableValue),
        alignment: "right",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
      {
        text: "9%",
        alignment: "center",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
      {
        text: formatAmount(cgstAmount),
        alignment: "right",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
      {
        text: "9%",
        alignment: "center",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
      {
        text: formatAmount(sgstAmount),
        alignment: "right",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
      {
        text: formatAmount(data.total_price),
        alignment: "right",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
    ]);

    // ================= SHIPPING =================
    itemRows.push([
      {
        text: "Transportation (Shipping Fee)",
        alignment: "left",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
      "",
      "",
      "",
      "",
      "",
      "",
      {
        text: formatAmount(data.shipping_fee),
        alignment: "right",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
    ]);

    // ================= PREPAID DISCOUNT =================
    if (data.prepaidDiscount > 0) {
      itemRows.push([
        {
          text: "Prepaid Discount",
          alignment: "left",
          fontSize: 10,
          color: "#333333",
          margin: [4, 4, 4, 4],
        },
        "",
        "",
        "",
        "",
        "",
        "",
        {
          text: formatAmount(-data.prepaidDiscount),
          alignment: "right",
          fontSize: 10,
          color: "#333333",
          margin: [4, 4, 4, 4],
        },
      ]);
    }

    // ================= POSTPAID CHARGES =================
    if (data.postpaidCharges > 0) {
      itemRows.push([
        {
          text: "Postpaid Charges",
          alignment: "left",
          fontSize: 10,
          color: "#333333",
          margin: [4, 4, 4, 4],
        },
        "",
        "",
        "",
        "",
        "",
        "",
        {
          text: formatAmount(data.postpaidCharges),
          alignment: "right",
          fontSize: 10,
          color: "#333333",
          margin: [4, 4, 4, 4],
        },
      ]);
    }

    if (data.discount > 0) {
      itemRows.push([
        {
          text: "Discount (Coupon Code)",
          alignment: "left",
          fontSize: 10,
          color: "#333333",
          margin: [4, 4, 4, 4],
        },
        "",
        "",
        "",
        "",
        "",
        "",
        {
          text: formatAmount(-data.discount),
          alignment: "right",
          fontSize: 10,
          color: "#333333",
          margin: [4, 4, 4, 4],
        },
      ]);
    }

    // ================= TOTAL =================
    itemRows.push([
      { text: "Total", bold: true, fontSize: 10, margin: [4, 4, 4, 4] },
      "",
      {
        text: formatAmount(taxableValue),
        alignment: "right",
        bold: true,
        fontSize: 10,
        margin: [4, 4, 4, 4],
      },
      "",
      {
        text: formatAmount(cgstAmount),
        alignment: "right",
        bold: true,
        fontSize: 10,
        margin: [4, 4, 4, 4],
      },
      "",
      {
        text: formatAmount(sgstAmount),
        alignment: "right",
        bold: true,
        fontSize: 10,
        margin: [4, 4, 4, 4],
      },
      {
        text: formatAmount(data.final_price),
        alignment: "right",
        bold: true,
        fontSize: 10,
        margin: [4, 4, 4, 4],
      },
    ]);

    // ================= AMOUNT IN WORDS =================
    itemRows.push([
      {
        colSpan: 8,
        text: `Total Amount (in words):      INR ${numberToWords(data.final_price)} Only`,
        fontSize: 10,
        bold: true,
        margin: [5, 5, 5, 5],
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]);

    itemRows.push([
      {
        text: "Online Paid Amount",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {
        text: formatAmount(data.online_paid_amount),
        alignment: "right",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
    ]);

    itemRows.push([
      {
        text: "COD Remaining Amount",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {
        text: formatAmount(data.cod_amount),
        alignment: "right",
        fontSize: 10,
        color: "#333333",
        margin: [4, 4, 4, 4],
      },
    ]);

    itemRows.push([
      {
        colSpan: 8,
        text: `Amount To Be Collected (in words):      INR ${numberToWords(data.cod_amount)} Only`,
        fontSize: 10,
        bold: true,
        margin: [5, 5, 5, 5],
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]);
  }

  const dd: TDocumentDefinitions = {
    images: {
      stamp: stampBase64,
    },
    defaultStyle: { font: "Helvetica" },
    content: [
      {
        text: "TAX INVOICE",
        alignment: "center",
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 10],
        color: "#000000",
      },
      {
        // Outer table
        table: {
          widths: ["25%", "25%", "25%", "25%"],
          body: [
            [
              // LEFT SIDE (Company details spans 2 columns)
              {
                colSpan: 2,
                stack: [
                  {
                    text: "Sonic Industries",
                    bold: true,
                    fontSize: 10,
                    margin: [0, 0, 0, 5],
                  },
                  {
                    text: "THIRD FLOOR, B-301",
                    fontSize: 9,
                    margin: [0, 0, 0, 4],
                  },
                  {
                    text: "OM SAI DHAM, CENTRAL PARK",
                    fontSize: 9,
                    margin: [0, 0, 0, 4],
                  },
                  {
                    text: "TULINJ, Nallasopara East",
                    fontSize: 9,
                    margin: [0, 0, 0, 4],
                  },
                  {
                    text: "Vasai Virar, Palghar",
                    fontSize: 9,
                    margin: [0, 0, 0, 4],
                  },
                  {
                    text: "Maharashtra - 401209, India",
                    fontSize: 9,
                    margin: [0, 0, 0, 4],
                  },
                  {
                    text: "GSTIN/UIN: 27BIZPV6068D1ZD",
                    fontSize: 9,
                    margin: [0, 0, 0, 4],
                  },
                  { text: "State Name: Maharashtra, Code: 27", fontSize: 9 },
                ],
                margin: [5, 5, 5, 5],
              },
              {},

              // RIGHT SIDE – COLUMN 1
              {
                stack: [
                  {
                    text: "Invoice No.",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                  {
                    text: data.orderNumber,
                    fontSize: 10,
                    bold: true,
                    margin: [0, 0, 0, 5],
                  },
                  {
                    canvas: [
                      {
                        type: "line",
                        x1: -10,
                        y1: 0,
                        x2: 248,
                        y2: 0,
                        lineWidth: 0.6,
                        lineColor: "#777777",
                      },
                    ],
                    margin: [0, 0, 0, 8],
                  },
                  {
                    text: "Delivery Note",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                  { text: " ", fontSize: 10, bold: true, margin: [0, 0, 0, 5] },
                  {
                    canvas: [
                      {
                        type: "line",
                        x1: -10,
                        y1: 0,
                        x2: 248,
                        y2: 0,
                        lineWidth: 0.6,
                        lineColor: "#777777",
                      },
                    ],
                    margin: [0, 0, 0, 8],
                  },
                  {
                    text: "Reference No. & Date",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                  { text: " ", fontSize: 10, bold: true },
                ],
                margin: [5, 5, 5, 5],
              },

              // RIGHT SIDE – COLUMN 2
              {
                stack: [
                  {
                    text: "Dated",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                  {
                    text: formatDate(data.createdAt),
                    fontSize: 10,
                    bold: true,
                    margin: [0, 0, 0, 13],
                  },
                  {
                    text: "Mode/Terms of Payment",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                  {
                    text: data.payment_method.toUpperCase(),
                    fontSize: 10,
                    bold: true,
                    margin: [0, 0, 0, 13],
                  },
                  {
                    text: "Other References",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                  { text: " ", fontSize: 10, bold: true },
                ],
                margin: [5, 5, 5, 5],
              },
            ],

            [
              {
                colSpan: 2,
                stack: [
                  {
                    text: "Consignee (Ship to)",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 3],
                  },

                  {
                    text: `${data.shipping_address?.firstName} ${data.shipping_address?.lastName}`,
                    bold: true,
                    fontSize: 10,
                    margin: [0, 0, 0, 3],
                  },

                  {
                    text: `${data.shipping_address?.address},`,
                    fontSize: 9,
                    margin: [0, 0, 0, 2],
                  },
                  {
                    text: `${data.shipping_address?.city},`,
                    fontSize: 9,
                    margin: [0, 0, 0, 2],
                  },
                  {
                    text: `${data.shipping_address?.state} - ${data.shipping_address?.postalCode}, ${data.shipping_address?.country}`,
                    fontSize: 9,
                    margin: [0, 0, 0, 4],
                  },

                  {
                    columns: [
                      { text: "GSTIN/UIN", fontSize: 9, width: "auto" },
                      {
                        text: `: ${data.customer?.gstin ? data.customer?.gstin : ""}`,
                        fontSize: 9,
                      },
                    ],
                    margin: [0, 0, 0, 2],
                  },
                  {
                    columns: [
                      { text: "State Name", fontSize: 9, width: "auto" },
                      { text: ": Maharashtra, Code : 27", fontSize: 9 },
                    ],
                  },
                ],
                margin: [5, 5, 5, 5],
              },
              {},
              {
                stack: [
                  {
                    text: "Buyer's Order No.",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                  { text: " ", fontSize: 10, margin: [0, 0, 0, 5] },
                  {
                    canvas: [
                      {
                        type: "line",
                        x1: -10,
                        y1: 0,
                        x2: 248,
                        y2: 0,
                        lineWidth: 0.6,
                        lineColor: "#777777",
                      },
                    ],
                    margin: [0, 0, 0, 8],
                  },
                  {
                    text: "Dispatch Doc No.",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                  { text: " ", fontSize: 10, margin: [0, 0, 0, 5] },
                  {
                    canvas: [
                      {
                        type: "line",
                        x1: -10,
                        y1: 0,
                        x2: 248,
                        y2: 0,
                        lineWidth: 0.6,
                        lineColor: "#777777",
                      },
                    ],
                    margin: [0, 0, 0, 8],
                  },
                  {
                    text: "Dispatched through",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 4],
                  },
                  { text: "", fontSize: 10 },
                ],
                margin: [5, 5, 5, 5],
              },
              {
                stack: [
                  {
                    text: "Dated",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                  { text: " ", fontSize: 10, margin: [0, 0, 0, 13] },
                  {
                    text: "Delivery Note Date",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                  { text: " ", fontSize: 10, margin: [0, 0, 0, 13] },
                  {
                    text: "Destination",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                  { text: " ", fontSize: 10 },
                ],
                margin: [5, 5, 5, 5],
              },
            ],

            [
              {
                colSpan: 2,
                stack: [
                  {
                    text: "Buyer (Bill to)",
                    fontSize: 9,
                    color: "#555555",
                    margin: [0, 0, 0, 3],
                  },

                  {
                    text: `${data.billing_address?.firstName} ${data.billing_address?.lastName}`,
                    bold: true,
                    fontSize: 10,
                    margin: [0, 0, 0, 3],
                  },

                  {
                    text: `${data.billing_address?.address},`,
                    fontSize: 9,
                    margin: [0, 0, 0, 2],
                  },
                  {
                    text: `${data.billing_address?.city},`,
                    fontSize: 9,
                    margin: [0, 0, 0, 2],
                  },
                  {
                    text: `${data.billing_address?.state} - ${data.billing_address?.postalCode}, ${data.billing_address?.country}`,
                    fontSize: 9,
                    margin: [0, 0, 0, 4],
                  },

                  {
                    columns: [
                      { text: "GSTIN/UIN", fontSize: 9, width: "auto" },
                      {
                        text: `: ${data.customer?.gstin ? data.customer?.gstin : ""}`,
                        fontSize: 9,
                      },
                    ],
                    margin: [0, 0, 0, 2],
                  },
                  {
                    columns: [
                      { text: "State Name", fontSize: 9, width: "auto" },
                      { text: ": Maharashtra, Code : 27", fontSize: 9 },
                    ],
                  },
                ],
                margin: [5, 5, 5, 5],
              },
              {},
              {
                colSpan: 1,
                border: [true, true, false, true],
                stack: [
                  {
                    text: "Terms of Delivery",
                    fontSize: 9,
                    color: "#555555",
                  },
                  { text: "", fontSize: 10 },
                ],
                margin: [5, 5, 5, 5],
              },
              {},
            ],
          ],
        },
        layout: {
          // Draw outer table border
          hLineWidth: () => 0.75,
          vLineWidth: () => 0.75,
          hLineColor: () => "#777777",
          vLineColor: () => "#777777",
        },
      },
      {
        margin: [0, 0, 0, 0],
        table: {
          widths: [
            "25%", // Product Name (widest)
            "9%", // Quantity
            "14%", // Taxable Value
            "7%", // CGST Rate
            "10%", // CGST Amount
            "7%", // SGST Rate
            "10%", // SGST Amount
            "18%", // Total Tax Amount
          ],
          body: [
            // ================= HEADER =================
            [
              {
                text: "Product Name",
                style: "tableHeader",
                fontSize: 9,
                alignment: "center",
                margin: [0, 6, 0, 6],
                bold: true,
              },
              {
                text: "Quantity",
                style: "tableHeader",
                fontSize: 9,
                alignment: "center",
                margin: [0, 6, 0, 6],
                bold: true,
              },
              {
                text: "Taxable Value",
                style: "tableHeader",
                fontSize: 9,
                alignment: "center",
                margin: [0, 6, 0, 6],
                bold: true,
              },
              {
                text: "CGST Rate",
                style: "tableHeader",
                fontSize: 9,
                alignment: "center",
                margin: [0, 6, 0, 6],
                bold: true,
              },
              {
                text: "CGST Amount",
                style: "tableHeader",
                fontSize: 9,
                alignment: "center",
                margin: [0, 6, 0, 6],
                bold: true,
              },
              {
                text: "SGST Rate",
                style: "tableHeader",
                fontSize: 9,
                alignment: "center",
                margin: [0, 6, 0, 6],
                bold: true,
              },
              {
                text: "SGST Amount",
                style: "tableHeader",
                fontSize: 9,
                alignment: "center",
                margin: [0, 6, 0, 6],
                bold: true,
              },
              {
                text: "Total",
                style: "tableHeader",
                fontSize: 9,
                alignment: "center",
                margin: [0, 6, 0, 6],
                bold: true,
              },
            ],

            ...itemRows,
          ],
        },

        layout: {
          hLineWidth: () => 0.75,
          vLineWidth: () => 0.75,
          hLineColor: () => "#777777",
          vLineColor: () => "#777777",
        },
      },
      {
        margin: [0, 0, 0, 0],
        table: {
          widths: ["60%", "40%"],
          body: [
            [
              // ===== LEFT SIDE : BANK DETAILS =====
              {
                stack: [
                  {
                    text: "Company's Bank Details",
                    bold: true,
                    fontSize: 10,
                    margin: [5, 5, 5, 5],
                  },

                  {
                    columns: [
                      {
                        text: "A/c Holder's Name",
                        fontSize: 10,
                        width: "35%",
                        color: "#333333",
                        margin: [3, 3, 3, 3],
                      },
                      {
                        text: ": Sonic Industries",
                        fontSize: 10,
                        color: "#333333",
                        bold: true,
                        margin: [3, 3, 3, 3],
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: "Bank Name",
                        fontSize: 10,
                        width: "35%",
                        color: "#333333",
                        margin: [3, 3, 3, 3],
                      },
                      {
                        text: ": ABHUDYADA BANK",
                        fontSize: 10,
                        color: "#333333",
                        bold: true,
                        margin: [3, 3, 3, 3],
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: "A/c No.",
                        fontSize: 10,
                        width: "35%",
                        color: "#333333",
                        margin: [3, 3, 3, 3],
                      },
                      {
                        text: ": 095021100000479",
                        fontSize: 10,
                        color: "#333333",
                        bold: true,
                        margin: [3, 3, 3, 3],
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: "Branch & IFSC Code",
                        fontSize: 10,
                        width: "35%",
                        color: "#333333",
                        margin: [3, 3, 3, 3],
                      },
                      {
                        text: ": Nallasopara (W) & ABHY0065059",
                        fontSize: 10,
                        bold: true,
                        color: "#333333",
                        margin: [3, 3, 3, 3],
                      },
                    ],
                    margin: [0, 0, 0, 8],
                  },

                  {
                    text: "Declaration:\nWe declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.",
                    fontSize: 9,
                    color: "#333333",
                    margin: [2, 2, 2, 2],
                    lineHeight: 1.5,
                  },
                ],
                margin: [5, 5, 5, 5],
              },

              // ===== RIGHT SIDE : SIGNATURE =====
              {
                stack: [
                  {
                    text: "For Sonic Industries",
                    alignment: "right",
                    fontSize: 10,
                    bold: true,
                    color: "#333333",
                    margin: [0, 0, 0, 30],
                  },

                  {
                    image: "stamp",
                    width: 50,
                    alignment: "right",
                    margin: [0, 0, 0, 20],
                  },

                  {
                    text: "Authorised Signatory",
                    alignment: "right",
                    bold: true,
                    color: "#333333",
                    fontSize: 10,
                  },
                ],
                margin: [5, 5, 5, 5],
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0.75,
          vLineWidth: () => 0.75,
          hLineColor: () => "#777777",
          vLineColor: () => "#777777",
        },
      },
      {
        text: "* This is a computer generated invoice and does not require a physical signature.",
        alignment: "center",
        fontSize: 9,
        italics: true,
        color: "#555555",
        margin: [0, 10, 0, 0],
      },
    ],
  };

  const pdfDoc = printer.createPdfKitDocument(dd);
  return pdfDoc;
};
