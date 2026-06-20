import { Container } from './container'

export function Footer() {
  return (
    <footer className="border-t">
      <Container>
        <div className="py-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} InvoiceWeb. 노션 기반 견적서 공유
              서비스.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
