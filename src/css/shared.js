import styled from "@emotion/styled";

export const Header = styled.div`
font-size: 2.125rem;
font-weight:700;
color: var(--font-color);
text-transform: uppercase;
text-align: ${props => props.left ? 'left' : props.right ? 'right' : 'center'};
font-size: ${props => (props.lg ? "2.125rem" : "1.25rem")};
text-shadow:rgba(0, 0, 0, 0.2) 1px 1px 2px;
`
