import { resend } from "@/lib/resend";
import { toPlainText } from "@react-email/render";

export async function sendSupportMessage(
  params: { sender: string, message: string }
) {
  const { sender, message } = params;
  const previewText = "You have 1 new message"

  const html = htmlMail({ sender, message, previewText });
  const text = toPlainText(html);

  try {
    const result = await resend.emails.send({
      from: "noreply@runefall.net",
      to: process.env.EMAIL_SUPPORT_RECEIVER as string,
      subject: `Runefall Support | Message from ${sender}`,
      html: html,
      text: text,
      tags: [
        {
          name: "category",
          value: "support",
        },
        {
          name: "type",
          value: "message",
        },
        {
          name: "app",
          value: "runefall",
        },
      ],
    });

    // Resend returns { data: { id }, error: null } on success
    if (result.error) {
      throw new Error(`Email could not be sent: ${result.error.message}`);
    }

    console.log("Email sent successfully:", result.data);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function htmlMail(
  params: { sender: string, message: string, previewText: string }) {
  const { sender, message, previewText } = params;

  return `
  <!-- Preview Text -->
<div style="display: none; max-height: 0px; overflow: hidden;">
  ${previewText}
</div>
<div style="display: none; max-height: 0px; overflow: hidden;">
  &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>
<div style="display: none; max-height: 0px; overflow: hidden;">
  &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>
<table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center"
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                margin-top: 0;
                                margin-right: auto;
                                margin-bottom: 0;
                                margin-left: auto;
                                padding-top: 0;
                                padding-right: 0;
                                padding-bottom: 0;
                                padding-left: 0;
                              "
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <tr style="margin: 0; padding: 0">
                                      <td
                                        align="center"
                                        data-id="__react-email-column"
                                        style="
                                          margin: 0;
                                          padding: 0;
                                          /* background: linear-gradient(
                                            #1E1231,
                                            #1E1231
                                          ); */
                                          background-color: #0b0810;
                                          font-family: Arial, sans-serif;
                                        "
                                      >
                                        <table
                                          align="center"
                                          width="100%"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            margin-top: 0;
                                            margin-right: auto;
                                            margin-bottom: 0;
                                            margin-left: auto;
                                            padding-top: 0;
                                            padding-right: 0;
                                            padding-bottom: 0;
                                            padding-left: 0;
                                            max-width: 640px;
                                            background: linear-gradient(
                                              #1e1231,
                                              #1e1231
                                            );
                                            background-color: #1e1231;
                                          "
                                        >
                                          <tbody>
                                            <tr>
                                              <td>
                                                <tr
                                                  style="
                                                    margin: 0;
                                                    padding: 0;
                                                    width: 100%;
                                                  "
                                                >
                                                  <td
                                                    data-id="__react-email-column"
                                                    style="
                                                      margin: 0;
                                                      padding: 0;
                                                    "
                                                  >
                                                    <table
                                                      align="center"
                                                      width="100%"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="
                                                        margin-top: 0;
                                                        margin-right: auto;
                                                        margin-bottom: 0;
                                                        margin-left: auto;
                                                        padding-top: 0;
                                                        padding-right: 0;
                                                        padding-bottom: 0;
                                                        padding-left: 0;
                                                        background: linear-gradient(
                                                          #1e1231,
                                                          #1e1231
                                                        );
                                                        background-color: #1e1231;
                                                        text-align: center;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            <tr
                                                              style="
                                                                margin: 0;
                                                                padding: 0;
                                                              "
                                                            >
                                                              <td
                                                                data-id="__react-email-column"
                                                                style="
                                                                  margin: 0;
                                                                  padding: 0;
                                                                "
                                                              >
                                                                <img
                                                                  alt="Runefall Portal"
                                                                  src="https://cdn.runefall.net/images/a6b0bb85-ab9a-471e-5ccc-a6d0eae20700/public"
                                                                  style="
                                                                    display: block;
                                                                    outline: none;
                                                                    border: 0px;
                                                                    text-decoration: none;
                                                                    border-bottom: 0px;
                                                                    border-bottom-color: initial;
                                                                    border-bottom-style: initial;
                                                                    border-bottom-width: 0px;
                                                                    border-color: initial;
                                                                    border-image: initial;
                                                                    border-image-outset: initial;
                                                                    border-image-repeat: initial;
                                                                    border-image-slice: initial;
                                                                    border-image-source: initial;
                                                                    border-image-width: initial;
                                                                    border-left: 0px;
                                                                    border-left-color: initial;
                                                                    border-left-style: initial;
                                                                    border-left-width: 0px;
                                                                    border-right: 0px;
                                                                    border-right-color: initial;
                                                                    border-right-style: initial;
                                                                    border-right-width: 0px;
                                                                    border-style: initial;
                                                                    border-top: 0px;
                                                                    border-top-color: initial;
                                                                    border-top-style: initial;
                                                                    border-top-width: 0px;
                                                                    border-width: 0px;
                                                                    height: auto;
                                                                    max-width: 640px;
                                                                    outline-color: initial;
                                                                    outline-style: none;
                                                                    outline-width: initial;
                                                                    text-decoration-color: initial;
                                                                    text-decoration-line: none;
                                                                    text-decoration-style: initial;
                                                                    text-decoration-thickness: initial;
                                                                    width: 100%;
                                                                  "
                                                                  width="100%"
                                                                /><img
                                                                  alt="Runefall"
                                                                  src="https://cdn.runefall.net/images/e359af1d-6380-4de3-0ad0-805101b56600/public"
                                                                  style="
                                                                    display: block;
                                                                    outline: none;
                                                                    border: 0px;
                                                                    text-decoration: none;
                                                                    border-bottom: 0px;
                                                                    border-bottom-color: initial;
                                                                    border-bottom-style: initial;
                                                                    border-bottom-width: 0px;
                                                                    border-color: initial;
                                                                    border-image: initial;
                                                                    border-image-outset: initial;
                                                                    border-image-repeat: initial;
                                                                    border-image-slice: initial;
                                                                    border-image-source: initial;
                                                                    border-image-width: initial;
                                                                    border-left: 0px;
                                                                    border-left-color: initial;
                                                                    border-left-style: initial;
                                                                    border-left-width: 0px;
                                                                    border-right: 0px;
                                                                    border-right-color: initial;
                                                                    border-right-style: initial;
                                                                    border-right-width: 0px;
                                                                    border-style: initial;
                                                                    border-top: 0px;
                                                                    border-top-color: initial;
                                                                    border-top-style: initial;
                                                                    border-top-width: 0px;
                                                                    border-width: 0px;
                                                                    height: auto;
                                                                    margin: -100px
                                                                      auto 0px;
                                                                    margin-bottom: 0px;
                                                                    margin-left: auto;
                                                                    margin-right: auto;
                                                                    margin-top: -100px;
                                                                    outline-color: initial;
                                                                    outline-style: none;
                                                                    outline-width: initial;
                                                                    text-decoration-color: initial;
                                                                    text-decoration-line: none;
                                                                    text-decoration-style: initial;
                                                                    text-decoration-thickness: initial;
                                                                    width: 300px;
                                                                  "
                                                                  width="300"
                                                                />
                                                                <!-- SEPARATOR -->
                                                                <table
                                                                  align="center"
                                                                  width="100%"
                                                                  border="0"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  role="presentation"
                                                                  style="
                                                                    margin-top: 0;
                                                                    margin-right: auto;
                                                                    margin-bottom: 0;
                                                                    margin-left: auto;
                                                                    padding-top: 20px;
                                                                    padding-right: 0;
                                                                    padding-bottom: 30px;
                                                                    padding-left: 0;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>
                                                                        <tr
                                                                          style="
                                                                            margin: 0;
                                                                            padding: 0;
                                                                          "
                                                                        >
                                                                          <td
                                                                            data-id="__react-email-column"
                                                                            style="
                                                                              margin: 0;
                                                                              padding: 0;
                                                                            "
                                                                          >
                                                                            <table
                                                                              align="center"
                                                                              width="100%"
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              role="presentation"
                                                                              style="
                                                                                margin-top: 0;
                                                                                margin-right: auto;
                                                                                margin-bottom: 0;
                                                                                margin-left: auto;
                                                                                padding-top: 0;
                                                                                padding-right: 0;
                                                                                padding-bottom: 0;
                                                                                padding-left: 0;
                                                                                width: 100%;
                                                                                max-width: 480px;
                                                                              "
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td>
                                                                                    <tr
                                                                                      style="
                                                                                        margin: 0;
                                                                                        padding: 0;
                                                                                        width: 100%;
                                                                                      "
                                                                                    >
                                                                                      <td
                                                                                        data-id="__react-email-column"
                                                                                        style="
                                                                                          margin: 0;
                                                                                          padding: 0;
                                                                                          width: 45%;
                                                                                          vertical-align: middle;
                                                                                        "
                                                                                      >
                                                                                        <div
                                                                                          style="
                                                                                            margin: 0;
                                                                                            padding: 0;
                                                                                            height: 1px;
                                                                                            background: #4d475f
                                                                                          "
                                                                                        >
                                                                                          <p
                                                                                            style="
                                                                                              margin: 0;
                                                                                              padding: 0;
                                                                                            "
                                                                                          >
                                                                                            <br />
                                                                                          </p>
                                                                                        </div>
                                                                                      </td>

                                                                                      <td
                                                                                        align="center"
                                                                                        data-id="__react-email-column"
                                                                                        style="
                                                                                          margin: 0;
                                                                                          padding: 0;
                                                                                          text-align: center;
                                                                                        "
                                                                                      >
                                                                                        <img
                                                                                          style="
                                                                                            display: inline-block;
                                                                                            width: 24px;
                                                                                            height: 24px;
                                                                                          "
                                                                                          src="https://cdn.runefall.net/images/103a59fa-18be-4e21-0112-ed421ec6e400/public"
                                                                                        ></img>
                                                                                      </td>

                                                                                      <td
                                                                                        data-id="__react-email-column"
                                                                                        style="
                                                                                          margin: 0;
                                                                                          padding: 0;
                                                                                          width: 45%;
                                                                                          vertical-align: middle;
                                                                                        "
                                                                                      >
                                                                                        <div
                                                                                          style="
                                                                                            margin: 0;
                                                                                            padding: 0;
                                                                                            height: 1px;
                                                                                            background: #4d475f
                                                                                          "
                                                                                        >
                                                                                          <p
                                                                                            style="
                                                                                              margin: 0;
                                                                                              padding: 0;
                                                                                            "
                                                                                          >
                                                                                            <br />
                                                                                          </p>
                                                                                        </div>
                                                                                      </td>
                                                                                    </tr>
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                                <table
                                                                  align="center"
                                                                  width="100%"
                                                                  border="0"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  role="presentation"
                                                                  style="
                                                                    margin-top: 0;
                                                                    margin-right: auto;
                                                                    margin-bottom: 0;
                                                                    margin-left: auto;
                                                                    padding-top: 20px;
                                                                    padding-right: 0;
                                                                    padding-bottom: 40px;
                                                                    padding-left: 0;
                                                                    text-align: center;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>
                                                                        <tr
                                                                          style="
                                                                            margin: 0;
                                                                            padding: 0;
                                                                          "
                                                                        >
                                                                          <td
                                                                            data-id="__react-email-column"
                                                                            style="
                                                                              margin: 0;
                                                                              padding: 0;
                                                                            "
                                                                          >
                                                                            <div>
                                                                              <h1
                                                                                class="node-heading"
                                                                                style="
                                                                                  margin: 0px;
                                                                                  padding: 0.389em
                                                                                    0px
                                                                                    10px;
                                                                                  color: rgb(
                                                                                    199,
                                                                                    199,
                                                                                    199
                                                                                  );
                                                                                  font-family: Georgia,
                                                                                    'Times New Roman',
                                                                                    serif;
                                                                                  font-size: 28px;
                                                                                  font-style: normal;
                                                                                  font-variant-caps: normal;
                                                                                  font-variant-ligatures: normal;
                                                                                  font-weight: bold;
                                                                                  letter-spacing: normal;
                                                                                  line-height: 36px;
                                                                                  margin-bottom: 0px;
                                                                                  margin-left: 0px;
                                                                                  margin-right: 0px;
                                                                                  margin-top: 0px;
                                                                                  orphans: 2;
                                                                                  padding-bottom: 10px;
                                                                                  padding-left: 0px;
                                                                                  padding-right: 0px;
                                                                                  padding-top: 0.389em;
                                                                                  text-align: center;
                                                                                  text-decoration-color: initial;
                                                                                  text-decoration-style: initial;
                                                                                  text-decoration-thickness: initial;
                                                                                  text-indent: 0px;
                                                                                  text-transform: none;
                                                                                  text-wrap-mode: wrap;
                                                                                  white-space: normal;
                                                                                  white-space-collapse: collapse;
                                                                                  widows: 2;
                                                                                  word-spacing: 0px;
                                                                                "
                                                                              >
                                                                                You
                                                                                received a message from ${sender}
                                                                              </h1>
                                                                              <p
                                                                                style="
                                                                                  margin: 0
                                                                                    0
                                                                                    4px
                                                                                    0;
                                                                                  color: #d4d4e0;
                                                                                  font-size: 16px;
                                                                                  line-height: 1.7;
                                                                                  text-align: left;
                                                                                "
                                                                              >
                                                                                ${message}
                                                                              </p>
                                                                            </div>
                                                                          </td>
                                                                        </tr>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </td>
                                                        </tr>
                                                        
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          align="center"
                                          width="100%"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            margin-top: 0;
                                            margin-right: auto;
                                            margin-bottom: 0;
                                            margin-left: auto;
                                            padding-top: 0;
                                            padding-right: 0;
                                            padding-bottom: 0;
                                            padding-left: 0;
                                            max-width: 640px;
                                            background: linear-gradient(
                                              #1e1231,
                                              #1e1231
                                            );
                                            background-color: #1e1231;
                                          "
                                        >
                                          <tbody>
                                            <tr>
                                              <td>
                                                <tr
                                                  style="
                                                    margin: 0;
                                                    padding: 0;
                                                    width: 100%;
                                                  "
                                                >
                                                  <td
                                                    data-id="__react-email-column"
                                                    style="
                                                      margin: 0;
                                                      padding: 0;
                                                    "
                                                  >
                                                    <!-- SEPARATOR -->
                                                    <table
                                                                  align="center"
                                                                  width="100%"
                                                                  border="0"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  role="presentation"
                                                                  style="
                                                                    margin-top: 0;
                                                                    margin-right: auto;
                                                                    margin-bottom: 0;
                                                                    margin-left: auto;
                                                                    padding-top: 20px;
                                                                    padding-right: 0;
                                                                    padding-bottom: 30px;
                                                                    padding-left: 0;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>
                                                                        <tr
                                                                          style="
                                                                            margin: 0;
                                                                            padding: 0;
                                                                          "
                                                                        >
                                                                          <td
                                                                            data-id="__react-email-column"
                                                                            style="
                                                                              margin: 0;
                                                                              padding: 0;
                                                                            "
                                                                          >
                                                                            <table
                                                                              align="center"
                                                                              width="100%"
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              role="presentation"
                                                                              style="
                                                                                margin-top: 0;
                                                                                margin-right: auto;
                                                                                margin-bottom: 0;
                                                                                margin-left: auto;
                                                                                padding-top: 0;
                                                                                padding-right: 0;
                                                                                padding-bottom: 0;
                                                                                padding-left: 0;
                                                                                width: 100%;
                                                                                max-width: 480px;
                                                                              "
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td>
                                                                                    <tr
                                                                                      style="
                                                                                        margin: 0;
                                                                                        padding: 0;
                                                                                        width: 100%;
                                                                                      "
                                                                                    >
                                                                                      <td
                                                                                        data-id="__react-email-column"
                                                                                        style="
                                                                                          margin: 0;
                                                                                          padding: 0;
                                                                                          width: 45%;
                                                                                          vertical-align: middle;
                                                                                        "
                                                                                      >
                                                                                        <div
                                                                                          style="
                                                                                            margin: 0;
                                                                                            padding: 0;
                                                                                            height: 1px;
                                                                                            background: #4d475f
                                                                                          "
                                                                                        >
                                                                                          <p
                                                                                            style="
                                                                                              margin: 0;
                                                                                              padding: 0;
                                                                                            "
                                                                                          >
                                                                                            <br />
                                                                                          </p>
                                                                                        </div>
                                                                                      </td>

                                                                                      <td
                                                                                        align="center"
                                                                                        data-id="__react-email-column"
                                                                                        style="
                                                                                          margin: 0;
                                                                                          padding: 0;
                                                                                          text-align: center;
                                                                                        "
                                                                                      >
                                                                                        <img
                                                                                          style="
                                                                                            display: inline-block;
                                                                                            width: 24px;
                                                                                            height: 24px;
                                                                                          "
                                                                                          src="https://cdn.runefall.net/images/103a59fa-18be-4e21-0112-ed421ec6e400/public"
                                                                                        ></img>
                                                                                      </td>

                                                                                      <td
                                                                                        data-id="__react-email-column"
                                                                                        style="
                                                                                          margin: 0;
                                                                                          padding: 0;
                                                                                          width: 45%;
                                                                                          vertical-align: middle;
                                                                                        "
                                                                                      >
                                                                                        <div
                                                                                          style="
                                                                                            margin: 0;
                                                                                            padding: 0;
                                                                                            height: 1px;
                                                                                            background: #4d475f
                                                                                          "
                                                                                        >
                                                                                          <p
                                                                                            style="
                                                                                              margin: 0;
                                                                                              padding: 0;
                                                                                            "
                                                                                          >
                                                                                            <br />
                                                                                          </p>
                                                                                        </div>
                                                                                      </td>
                                                                                    </tr>
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                  </td>
                                                </tr>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          align="center"
                                          width="100%"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            margin-top: 0;
                                            margin-right: auto;
                                            margin-bottom: 0;
                                            margin-left: auto;
                                            padding-top: 0;
                                            padding-right: 0;
                                            padding-bottom: 0;
                                            padding-left: 0;
                                            max-width: 640px;
                                            background: linear-gradient(
                                              #1e1231,
                                              #1e1231
                                            );
                                            background-color: #1e1231;
                                          "
                                        >
                                          <tbody>
                                            <tr>
                                              <td>
                                                <tr
                                                  style="
                                                    margin: 0;
                                                    padding: 0;
                                                    width: 100%;
                                                  "
                                                >
                                                  <td
                                                    data-id="__react-email-column"
                                                    style="
                                                      margin: 0;
                                                      padding: 0;
                                                    "
                                                  >
                                                    <table
                                                      align="center"
                                                      width="100%"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="
                                                        margin-top: 0;
                                                        margin-right: auto;
                                                        margin-bottom: 0;
                                                        margin-left: auto;
                                                        padding-top: 0;
                                                        padding-right: 0;
                                                        padding-bottom: 0;
                                                        padding-left: 0;
                                                        background: linear-gradient(
                                                          #1e1231,
                                                          #1e1231
                                                        );
                                                        background-color: #1e1231;
                                                        text-align: center;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            <tr
                                                              style="
                                                                margin: 0;
                                                                padding: 0;
                                                              "
                                                            >
                                                              <td
                                                                data-id="__react-email-column"
                                                                style="
                                                                  margin: 0;
                                                                  padding: 0;
                                                                "
                                                              ></td>
                                                            </tr>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p style="margin: 0; padding: 0"><br /></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
