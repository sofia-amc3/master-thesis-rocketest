import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";

interface Props {
  link: string;
  pageName: string;
  imageAppears?: boolean;
  activePage?: boolean;
}

const Breadcrumbs = (props: Props) => {
  const router = useRouter();

  return (
    <div className={styles.createTestBreadcrumbs}>
      <Link
        href={props.activePage ? router.asPath : props.link}
        className={`${props.activePage && styles.createTestActivePage}`}
      >
        {props.pageName}
      </Link>

      {props.imageAppears && (
        <Image
          src="/icons/arrow-left.svg"
          alt="Arrow Icon"
          width={8}
          height={8}
        />
      )}
    </div>
  );
};

export default Breadcrumbs;
