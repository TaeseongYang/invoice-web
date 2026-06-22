import path from 'path'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import type { InvoiceWithItems } from '@/lib/types/invoice'

Font.register({
  family: 'NotoSansKR',
  fonts: [
    {
      src: path.join(process.cwd(), 'public/fonts/NotoSansKR-Regular.woff'),
      fontWeight: 400,
    },
    {
      src: path.join(process.cwd(), 'public/fonts/NotoSansKR-Bold.woff'),
      fontWeight: 700,
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansKR',
    fontSize: 10,
    padding: 48,
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 32,
    borderBottom: '2pt solid #e5e7eb',
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 10,
    color: '#6b7280',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#374151',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottom: '0.5pt solid #f3f4f6',
  },
  infoLabel: {
    color: '#6b7280',
    width: '40%',
  },
  infoValue: {
    color: '#111827',
    fontWeight: 700,
    width: '60%',
    textAlign: 'right',
  },
  table: {
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderBottom: '1pt solid #e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    fontWeight: 700,
    color: '#374151',
    fontSize: 9,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottom: '0.5pt solid #f3f4f6',
  },
  tableRowAlt: {
    backgroundColor: '#fafafa',
  },
  colName: { flex: 3 },
  colQty: { flex: 1, textAlign: 'right' },
  colUnit: { flex: 2, textAlign: 'right' },
  colAmount: { flex: 2, textAlign: 'right' },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTop: '1.5pt solid #111827',
    marginTop: 2,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: '#374151',
    marginRight: 16,
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: 700,
    color: '#111827',
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    left: 48,
    right: 48,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 8,
    borderTop: '0.5pt solid #e5e7eb',
    paddingTop: 8,
  },
})

function formatAmount(amount: number | null): string {
  if (amount === null) return '-'
  return `${amount.toLocaleString('ko-KR')}원`
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('ko-KR')
}

interface InvoicePDFDocumentProps {
  invoice: InvoiceWithItems
}

export function InvoicePDFDocument({ invoice }: InvoicePDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{invoice.title}</Text>
          <Text style={styles.headerSub}>InvoiceWeb 견적서</Text>
        </View>

        {/* 견적서 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>견적서 정보</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>수신인</Text>
            <Text style={styles.infoValue}>{invoice.clientName || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>발행일</Text>
            <Text style={styles.infoValue}>{formatDate(invoice.issuedAt)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>유효기간</Text>
            <Text style={styles.infoValue}>
              {formatDate(invoice.expiresAt)}까지
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>상태</Text>
            <Text style={styles.infoValue}>{invoice.status}</Text>
          </View>
        </View>

        {/* 견적 항목 테이블 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>견적 내용</Text>
          <View style={styles.table}>
            {/* 테이블 헤더 */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.colName]}>
                항목명
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colQty]}>수량</Text>
              <Text style={[styles.tableHeaderCell, styles.colUnit]}>단가</Text>
              <Text style={[styles.tableHeaderCell, styles.colAmount]}>
                금액
              </Text>
            </View>

            {/* 테이블 행 */}
            {invoice.items.map((item, idx) => (
              <View
                key={item.notionPageId}
                style={[
                  styles.tableRow,
                  idx % 2 === 1 ? styles.tableRowAlt : {},
                ]}
              >
                <Text style={styles.colName}>{item.name}</Text>
                <Text style={styles.colQty}>
                  {item.quantity !== null ? item.quantity : '-'}
                </Text>
                <Text style={styles.colUnit}>
                  {formatAmount(item.unitPrice)}
                </Text>
                <Text style={styles.colAmount}>
                  {formatAmount(item.amount)}
                </Text>
              </View>
            ))}

            {/* 합계 */}
            <View style={styles.tableFooter}>
              <Text style={styles.totalLabel}>합계</Text>
              <Text style={styles.totalAmount}>
                {formatAmount(invoice.totalAmount)}
              </Text>
            </View>
          </View>
        </View>

        {/* 푸터 */}
        <Text style={styles.footer}>
          이 견적서는 InvoiceWeb을 통해 생성되었습니다.
        </Text>
      </Page>
    </Document>
  )
}
