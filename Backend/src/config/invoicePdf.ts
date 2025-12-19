import PdfPrinter from "pdfmake";

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
  },
};

const printer = new PdfPrinter(fonts);

export interface InvoiceItem {
  name: string;
  qty: number;
  rate: number;
  cgst: number;
  sgst: number;
  total: number;
}

export interface InvoicePayload {
  invoiceNo: string;
  date: string;
  customer: {
    name: string;
    address: string;
    city: string;
    pincode: string;
  };
  items: InvoiceItem[];
  totals: {
    subtotal: string;
    cgst: string;
    sgst: string;
    grandTotal: string;
  };
  stampBase64: string;
}

export const generateInvoicePdf = async (data: InvoicePayload) => {
  const itemRows = data.items.map((i) => [
    { text: i.name, margin: [5, 5] },
    { text: "", margin: [5, 5] },
    { text: i.qty.toString(), alignment: "center", margin: [5, 5] },
    { text: i.rate.toFixed(2), alignment: "right", margin: [5, 5] },
    { text: i.cgst.toFixed(2), alignment: "right", margin: [5, 5] },
    { text: i.sgst.toFixed(2), alignment: "right", margin: [5, 5] },
    { text: i.total.toFixed(2), alignment: "right", margin: [5, 5] },
  ]);

  const docDefinition: any = {
    pageMargins: [40, 40, 40, 40],
    defaultStyle: {
      font: "Helvetica",
      fontSize: 9,
    },
    content: [
      // Complete bordered container
      {
        text: "Tax Invoice", style: "header", bold: true, fontSize: 20,
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                stack: [
                  // Header section
                  {
                    columns: [
                      {
                        width: "*",
                        text: [
                          { text: "Sonic Industries", bold: true, fontSize: 14, margin: [0, 0, 0, 3]},
                          { text: "Third Floor, B-301", fontSize: 8 },
                          { text: "Suyojan Commercial Complex, PATNK", fontSize: 8 },
                          { text: "Near Hotel President, CG Road", fontSize: 8 },
                          { text: "Ahmedabad - 380009", fontSize: 8 },
                          { text: "GSTIN: 24ABCDE1234F1Z2", fontSize: 8, margin: [0, 3, 0, 0] },
                        ],
                        border: [true,true,true,true],
                      },
                      {
                        width: 180,
                        table: {
                          widths: [80, "*"],
                          body: [
                            [
                              { text: "Invoice No.", fontSize: 8, border: [true, true, true, true] },
                              { text: data.invoiceNo, fontSize: 8, border: [true, true, true, true] },
                            ],
                            [
                              { text: "Dated", fontSize: 8, border: [true, true, true, true] },
                              { text: data.date, fontSize: 8, border: [true, true, true, true] },
                            ],
                            [
                              { text: "Delivery Note", fontSize: 8, border: [true, true, true, true] },
                              { text: "", fontSize: 8, border: [true, true, true, true] },
                            ],
                            [
                              { text: "Reference No. & Date", fontSize: 8, border: [true, true, true, true] },
                              { text: "", fontSize: 8, border: [true, true, true, true] },
                            ],
                            [
                              { text: "Buyer's Order No.", fontSize: 8, border: [true, true, true, true] },
                              { text: "", fontSize: 8, border: [true, true, true, true] },
                            ],
                            [
                              { text: "Dispatch Doc No.", fontSize: 8, border: [true, true, true, true] },
                              { text: "", fontSize: 8, border: [true, true, true, true] },
                            ],
                            [
                              { text: "Dispatched through", fontSize: 8, border: [true, true, true, true] },
                              { text: "", fontSize: 8, border: [true, true, true, true] },
                            ],
                            [
                              { text: "Terms of Delivery", fontSize: 8, border: [true, true, true, true] },
                              { text: "", fontSize: 8, border: [true, true, true, true] },
                            ],
                          ],
                        },
                        layout: {
                          defaultBorder: true,
                        },
                      },
                    ],
                    margin: [10, 10, 10, 10],
                  },

                  // Bill To section
                  {
                    table: {
                      widths: ["50%", "50%"],
                      body: [
                        [
                          {
                            text: [
                              { text: "Buyer:\n", bold: true, fontSize: 8 },
                              { text: `${data.customer.name}\n`, fontSize: 8 },
                              { text: `${data.customer.address}\n`, fontSize: 8 },
                              { text: `${data.customer.city} - ${data.customer.pincode}`, fontSize: 8 },
                            ],
                            margin: [5, 5],
                            border: [true, true, true, true],
                          },
                          {
                            text: [
                              { text: "Consignee:\n", bold: true, fontSize: 8 },
                              { text: `${data.customer.name}\n`, fontSize: 8 },
                              { text: `${data.customer.address}\n`, fontSize: 8 },
                              { text: `${data.customer.city} - ${data.customer.pincode}`, fontSize: 8 },
                            ],
                            margin: [5, 5],
                            border: [true, true, true, true],
                          },
                        ],
                      ],
                    },
                    layout: {
                      defaultBorder: true,
                    },
                    margin: [10, 0, 10, 0],
                  },

                  // Items table
                  {
                    table: {
                      headerRows: 1,
                      widths: ["*", 40, 30, 45, 45, 45, 60],
                      body: [
                        [
                          { text: "Description of Goods", bold: true, fontSize: 8, alignment: "center", margin: [5, 5] },
                          { text: "HSN/SAC", bold: true, fontSize: 8, alignment: "center", margin: [5, 5] },
                          { text: "Quantity", bold: true, fontSize: 8, alignment: "center", margin: [5, 5] },
                          { text: "Rate", bold: true, fontSize: 8, alignment: "center", margin: [5, 5] },
                          { text: "CGST", bold: true, fontSize: 8, alignment: "center", margin: [5, 5] },
                          { text: "SGST", bold: true, fontSize: 8, alignment: "center", margin: [5, 5] },
                          { text: "Amount", bold: true, fontSize: 8, alignment: "center", margin: [5, 5] },
                        ],
                        ...itemRows,
                      ],
                    },
                    layout: {
                      defaultBorder: true,
                      paddingLeft: () => 3,
                      paddingRight: () => 3,
                      paddingTop: () => 3,
                      paddingBottom: () => 3,
                    },
                    margin: [10, 10, 10, 0],
                  },

                  // Totals section
                  {
                    table: {
                      widths: ["*", 60],
                      body: [
                        [
                          { text: "", border: [true, false, false, false] },
                          { text: "", border: [true, false, true, false] },
                        ],
                        [
                          { text: "Total", alignment: "right", fontSize: 9, margin: [5, 3], border: [true, true, false, false] },
                          { text: data.totals.subtotal, alignment: "right", fontSize: 9, margin: [5, 3], border: [true, true, true, false] },
                        ],
                        [
                          { text: "CGST", alignment: "right", fontSize: 8, margin: [5, 2], border: [true, false, false, false] },
                          { text: data.totals.cgst, alignment: "right", fontSize: 8, margin: [5, 2], border: [true, false, true, false] },
                        ],
                        [
                          { text: "SGST", alignment: "right", fontSize: 8, margin: [5, 2], border: [true, false, false, false] },
                          { text: data.totals.sgst, alignment: "right", fontSize: 8, margin: [5, 2], border: [true, false, true, false] },
                        ],
                        [
                          { text: "Grand Total", alignment: "right", bold: true, fontSize: 9, margin: [5, 3], border: [true, true, false, true] },
                          { text: data.totals.grandTotal, alignment: "right", bold: true, fontSize: 9, margin: [5, 3], border: [true, true, true, true] },
                        ],
                      ],
                    },
                    margin: [10, 0, 10, 10],
                  },

                  // Company details and stamp
                  {
                    columns: [
                      {
                        width: "*",
                        text: [
                          { text: "Company's Bank Details\n", bold: true, fontSize: 7 },
                          { text: "Bank Name: State Bank of India\n", fontSize: 7 },
                          { text: "A/c No.: 1234567890\n", fontSize: 7 },
                          { text: "Branch & IFSC Code: SBIN0001234\n", fontSize: 7 },
                        ],
                        margin: [10, 5, 0, 10],
                      },
                      {
                        width: 140,
                        stack: [
                          { text: "for Sonic Industries", fontSize: 8, alignment: "center" },
                          {
                            // image: data.stampBase64,
                            image: `data:image/png;base64,${data.stampBase64}`,
                            width: 80,
                            alignment: "center",
                            margin: [0, 5, 0, 5],
                          },
                          { text: "Authorised Signatory", fontSize: 7, alignment: "center" },
                        ],
                        margin: [0, 5, 10, 10],
                      },
                    ],
                  },
                ],
                border: [false, false, false, false],
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => "#000000",
          vLineColor: () => "#000000",
        },
      },
    ],
  };

  return printer.createPdfKitDocument(docDefinition);
};